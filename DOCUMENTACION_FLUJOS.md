# Documentación de Clientes y Ventas

Este documento explica de manera sencilla cómo se relacionan las tablas principales utilizadas en el servicio `ClientesVentasService` y cómo funciona el flujo de una venta.

## Diagrama de relaciones (ER) general

```mermaid
erDiagram
  CLIENTES_PER {
    int CodCliente PK
    string Nombre
    string CodSucursal
    string NroDoc
  }
  CLIENTES_CONTACTOS {
    int CodCliente FK
    string NombreCont
    string ApellidoCont
    string Caracteristica
    string Numero
    string EsPrincipal
  }
  CLIENTE_VENTA {
    int CodVenta PK
    date Fecha
    float Total
    string FormaPago
    int CodVendedor
    int CodCliente FK
    string Estado
  }
  CLIENTE_VENTA_DETALLE {
    int CodVenta FK
    int CodProducto FK
    int Cantidad
    float PrecioUnit
  }
  PRODUCTO {
    int CodProducto PK
    string Producto
  }

  CLIENTES_PER ||--o{ CLIENTES_CONTACTOS : tiene
  CLIENTES_PER ||--o{ CLIENTE_VENTA : realiza
  CLIENTE_VENTA ||--|{ CLIENTE_VENTA_DETALLE : contiene
  CLIENTE_VENTA_DETALLE }|--|| PRODUCTO : referencia
```

---

# Endpoints principales

## 1. findAll

Devuelve todas las ventas registradas.

**Tablas involucradas:**
- CLIENTE_VENTA

```mermaid
erDiagram
  CLIENTE_VENTA {
    int CodVenta PK
    date Fecha
    float Total
    string FormaPago
    int CodVendedor
    int CodCliente FK
    string Estado
  }
```

**Ejemplo de respuesta:**
```json
[
  {
    "CodVenta": 1,
    "Fecha": "2024-05-01T00:00:00.000Z",
    "Total": 1000,
    "FormaPago": "Efectivo",
    "CodVendedor": 2,
    "CodCliente": 5,
    "Estado": "Finalizada"
  },
  ...
]
```

---

## 2. findByFecha

Devuelve todas las ventas entre dos fechas.

**Tablas involucradas:**
- CLIENTE_VENTA

```mermaid
erDiagram
  CLIENTE_VENTA {
    int CodVenta PK
    date Fecha
    float Total
    string FormaPago
    int CodVendedor
    int CodCliente FK
    string Estado
  }
```

**Ejemplo de respuesta:**
```json
[
  {
    "CodVenta": 2,
    "Fecha": "2024-05-02T00:00:00.000Z",
    "Total": 1500,
    "FormaPago": "Tarjeta",
    "CodVendedor": 3,
    "CodCliente": 7,
    "Estado": "Finalizada"
  },
  ...
]
```

---

## 3. findByFechaConCliente

Devuelve ventas entre dos fechas, incluyendo datos del cliente y su contacto principal.

**Tablas involucradas:**
- CLIENTE_VENTA
- CLIENTES_PER
- CLIENTES_CONTACTOS (solo el principal)

```mermaid
erDiagram
  CLIENTE_VENTA {
    int CodVenta PK
    date Fecha
    float Total
    string FormaPago
    int CodVendedor
    int CodCliente FK
  }
  CLIENTES_PER {
    int CodCliente PK
    string Nombre
    string CodSucursal
    string NroDoc
  }
  CLIENTES_CONTACTOS {
    int CodCliente FK
    string NombreCont
    string ApellidoCont
    string Caracteristica
    string Numero
    string EsPrincipal
  }
  CLIENTE_VENTA ||--|| CLIENTES_PER : "cliente"
  CLIENTES_PER ||--o{ CLIENTES_CONTACTOS : "contactos"
```

**Ejemplo de respuesta:**
```json
[
  {
    "CodVenta": 3,
    "Fecha": "2024-05-03T00:00:00.000Z",
    "Total": 2000,
    "FormaPago": "Transferencia",
    "CodVendedor": 1,
    "CodCliente": 8,
    "Nombre": "Juan",
    "CodSucursal": "S1",
    "NroDoc": "12345678",
    "NombreCont": "Ana",
    "ApellidoCont": "Pérez",
    "Telefonos": "+541112345678"
  },
  ...
]
```

---

## 4. findVentaCompleta

Devuelve todos los datos de una venta, incluyendo cliente, detalles y productos.

**Tablas involucradas:**
- CLIENTE_VENTA
- CLIENTES_PER
- CLIENTE_VENTA_DETALLE
- PRODUCTO

```mermaid
erDiagram
  CLIENTE_VENTA {
    int CodVenta PK
    date Fecha
    float Total
    string FormaPago
    int CodCliente FK
    string Estado
  }
  CLIENTES_PER {
    int CodCliente PK
    string Nombre
    string NroDoc
    string Telefonos
  }
  CLIENTE_VENTA_DETALLE {
    int CodVenta FK
    int CodProducto FK
    int Cantidad
    float PrecioUnit
  }
  PRODUCTO {
    int CodProducto PK
    string Producto
  }
  CLIENTE_VENTA ||--|| CLIENTES_PER : "cliente"
  CLIENTE_VENTA ||--o{ CLIENTE_VENTA_DETALLE : "detalles"
  CLIENTE_VENTA_DETALLE }|--|| PRODUCTO : "producto"
```

**Ejemplo de respuesta:**
```json
{
  "CodVenta": 4,
  "Fecha": "2024-05-04T00:00:00.000Z",
  "Total": 3000,
  "FormaPago": "Efectivo",
  "Estado": "Finalizada",
  "cliente": {
    "codCliente": 10,
    "nombre": "María",
    "nroDoc": "87654321",
    "telefonos": "+541198765432"
  },
  "detalles": [
    {
      "CodProducto": 101,
      "NombreProducto": "Silla",
      "Cantidad": 2,
      "PrecioUnit": 500,
      "Subtotal": 1000
    },
    {
      "CodProducto": 102,
      "NombreProducto": "Mesa",
      "Cantidad": 1,
      "PrecioUnit": 2000,
      "Subtotal": 2000
    }
  ]
}
```

---

# Flujo de consumo: del frontend al backend

A continuación se explica, en forma de flujo, cómo las acciones del usuario en la vista disparan llamadas a los endpoints del backend y cómo estos endpoints utilizan las funciones del servicio en el backend.

## 1. Al iniciar la vista de ventas
- **Acción:** Se carga la vista `VentasWsView.vue`.
- **Qué ocurre:**
  - Automáticamente se solicita el listado de ventas del día actual (o del rango por defecto).
  - Se llama al endpoint:
    - **GET** `/api/clientes-ventas/filtro/fecha?desde=...&hasta=...`
  - **Backend:** Este endpoint ejecuta la función `findByFechaConCliente(desde, hasta)` del servicio `ClientesVentasService`.
  - **Resultado:** Se obtiene la lista de ventas con datos de cliente y contacto principal, que se muestra en la tabla.

## 2. Cuando el usuario cambia el rango de fechas
- **Acción:** El usuario selecciona un nuevo rango de fechas en el filtro de la vista.
- **Qué ocurre:**
  - Se vuelve a llamar al endpoint:
    - **GET** `/api/clientes-ventas/filtro/fecha?desde=...&hasta=...`
  - **Backend:** Se ejecuta nuevamente `findByFechaConCliente(desde, hasta)`.
  - **Resultado:** Se actualiza la tabla con las ventas del nuevo rango.

## 3. Cuando el usuario hace clic en una venta para ver el detalle
- **Acción:** El usuario selecciona una venta en la tabla.
- **Qué ocurre:**
  - Se llama al endpoint:
    - **GET** `/api/clientes-ventas/:codVenta`
  - **Backend:** Este endpoint ejecuta la función `findVentaCompleta(codVenta)` del servicio.
  - **Resultado:** Se muestra el detalle completo de la venta, incluyendo cliente, productos y totales.

## 4. Cuando se filtra por sucursal o teléfono
- **Acción:** El usuario utiliza los filtros de sucursal o teléfono en la vista.
- **Qué ocurre:**
  - El filtrado se realiza en el frontend, sobre los datos ya obtenidos del endpoint de ventas por fecha.
  - **No se realiza una nueva llamada al backend** para estos filtros.

---

> **Resumen:**
> - La vista principal de ventas consume principalmente el endpoint `/api/clientes-ventas/filtro/fecha` (función `findByFechaConCliente`).
> - El detalle de una venta se obtiene con `/api/clientes-ventas/:codVenta` (función `findVentaCompleta`).
> - Los filtros de sucursal y teléfono se aplican en el frontend, no en el backend.

De esta forma, cada acción del usuario en la interfaz tiene un flujo claro hacia el backend y sus funciones correspondientes.

---

# Flujo de consumo: Pagos (Recibos) del frontend al backend

A continuación se explica cómo las acciones del usuario en la vista de pagos disparan llamadas a los endpoints del backend y cómo estos endpoints utilizan las funciones del servicio correspondiente en el backend.

## 1. Al iniciar la vista de pagos
- **Acción:** Se carga la vista `PagosWsView.vue`.
- **Qué ocurre:**
  - Automáticamente se solicita el listado de recibos del día actual (o del rango por defecto).
  - Se llama al endpoint:
    - **GET** `/api/clientes-recprov/filtro/fecha?desde=...&hasta=...`
  - **Backend:** Este endpoint ejecuta la función correspondiente en el servicio de recibos (por ejemplo, `findByFechaConCliente` o similar, según tu backend).
  - **Resultado:** Se obtiene la lista de recibos con datos de cliente, que se muestra en la tabla.

## 2. Cuando el usuario cambia el rango de fechas
- **Acción:** El usuario selecciona un nuevo rango de fechas en el filtro de la vista.
- **Qué ocurre:**
  - Se vuelve a llamar al endpoint:
    - **GET** `/api/clientes-recprov/filtro/fecha?desde=...&hasta=...`
  - **Backend:** Se ejecuta nuevamente la función de búsqueda por fecha en el servicio de recibos.
  - **Resultado:** Se actualiza la tabla con los recibos del nuevo rango.

## 3. Cuando el usuario hace clic en un recibo para ver el detalle
- **Acción:** El usuario selecciona un recibo en la tabla.
- **Qué ocurre:**
  - (Si existe endpoint de detalle) Se llama al endpoint:
    - **GET** `/api/clientes-recprov/:codRecibo` (esto depende de tu implementación)
  - **Backend:** Este endpoint ejecuta la función de detalle de recibo en el servicio.
  - **Resultado:** Se muestra el detalle completo del recibo seleccionado.

## 4. Cuando se filtra por sucursal o teléfono
- **Acción:** El usuario utiliza los filtros de sucursal o teléfono en la vista.
- **Qué ocurre:**
  - El filtrado se realiza en el frontend, sobre los datos ya obtenidos del endpoint de recibos por fecha.
  - **No se realiza una nueva llamada al backend** para estos filtros.

---

> **Resumen:**
> - La vista principal de pagos consume principalmente el endpoint `/api/clientes-recprov/filtro/fecha` (función de búsqueda por fecha en el backend).
> - El detalle de un recibo (si existe) se obtiene con `/api/clientes-recprov/:codRecibo` (función de detalle en el backend).
> - Los filtros de sucursal y teléfono se aplican en el frontend, no en el backend.

De esta forma, cada acción del usuario en la interfaz de pagos tiene un flujo claro hacia el backend y sus funciones correspondientes. 