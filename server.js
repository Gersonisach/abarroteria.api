const express = require('express');
const oracledb = require('oracledb');
const cors = require('cors');
const app = express();
const PORT = 5000;



app.use(cors());
app.use(express.json());

const dbConfig = {
    user: 'ALUMNO',
    password: 'Umg$2024',
    connectString: 'localhost/xe'
};

async function executeQuery(query, params = {}) {
    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(query, params);
        await connection.commit();
        return result.rows;
    } catch (error) {
        if (connection) await connection.rollback();
        throw error;
    } finally {
        if (connection) await connection.close();
    }
}

//-------------------------------------------------------PROVEEDOR-------------------------
// Crear proveedor
app.post('/proveedor/create', async (req, res) => {
    const { nombre_comercial, nombre_representante, apellido_representante, nit, pais_origen, telefono, direccion, correo_electronico } = req.body;
    if (!nombre_comercial || !nombre_representante || !apellido_representante || !nit || !pais_origen || !telefono || !direccion || !correo_electronico) {
        return res.status(400).send("Todos los campos son obligatorios");
    }

    const query = `BEGIN InsertarProveedor(:p_nombre_comercial, :p_nombre_representante, :p_apellido_representante, :p_nit, :p_pais_origen, :p_telefono, :p_direccion, :p_correo_electronico); END;`;
    const params = { p_nombre_comercial: nombre_comercial, p_nombre_representante: nombre_representante, p_apellido_representante: apellido_representante, p_nit: nit, p_pais_origen: pais_origen, p_telefono: telefono, p_direccion: direccion, p_correo_electronico: correo_electronico };

    try {
        const result = await executeQuery(query, params);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Actualizar proveedor
app.post('/proveedor/update', async (req, res) => {
    const { id_proveedor, nombre_comercial, nombre_representante, apellido_representante, nit, pais_origen, telefono, direccion, correo_electronico } = req.body;
    if (!id_proveedor || !nombre_comercial || !nombre_representante || !apellido_representante || !nit || !pais_origen || !telefono || !direccion || !correo_electronico) {
        return res.status(400).send("Todos los campos son obligatorios");
    }

    const query = `BEGIN ActualizarProveedor(:p_id_proveedor, :p_nombre_comercial, :p_nombre_representante, :p_apellido_representante, :p_nit, :p_pais_origen, :p_telefono, :p_direccion, :p_correo_electronico); END;`;
    const params = { p_id_proveedor: id_proveedor, p_nombre_comercial: nombre_comercial, p_nombre_representante: nombre_representante, p_apellido_representante: apellido_representante, p_nit: nit, p_pais_origen: pais_origen, p_telefono: telefono, p_direccion: direccion, p_correo_electronico: correo_electronico };

    try {
        const result = await executeQuery(query, params);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Eliminar proveedor
app.post('/proveedor/delete', async (req, res) => {
    const { id_proveedor } = req.body;
    if (!id_proveedor) {
        return res.status(400).send("El ID del proveedor es obligatorio");
    }

    const query = `BEGIN EliminarProveedor(:p_id_proveedor); END;`;
    const params = { p_id_proveedor: id_proveedor };

    try {
        const result = await executeQuery(query, params);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Obtener todos los proveedores
app.get('/proveedor/findall', async (req, res) => {
    const query = `SELECT * FROM TABLE(obtener_todos_proveedores())`;

    try {
        const result = await executeQuery(query);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Obtener proveedor por correo
app.get('/proveedor/findbyid', async (req, res) => {
    const { id } = req.query;
    if (!id) {
        return res.status(400).send("El correo es obligatorio");
    }

    const query = `SELECT * FROM TABLE(buscar_proveedor_por_correo(:p_correo))`;
    const params = { p_correo: id };

    try {
        const result = await executeQuery(query, params);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


///------------------------------------------ORDEN COMPRA-------------------------------------

// Crear orden de compra
app.post('/ordencompra/create', async (req, res) => {
    const { id_proveedor, id_producto, cantidad } = req.body;
    if (!id_proveedor || !id_producto || !cantidad) {
        return res.status(400).send("Todos los campos son obligatorios");
    }

    const query = `BEGIN InsertarOrdenCompra(:p_id_proveedor, :p_id_producto, :p_cantidad); END;`;
    const params = { p_id_proveedor: id_proveedor, p_id_producto: id_producto, p_cantidad: cantidad };

    try {
        const result = await executeQuery(query, params);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Actualizar orden de compra
app.post('/ordencompra/update', async (req, res) => {
    const { id_orden_compra, confirmada_existencia } = req.body;
    if (!id_orden_compra || !confirmada_existencia) {
        return res.status(400).send("Todos los campos son obligatorios");
    }

    const query = `BEGIN ActualizarOrdenCompra(:p_id_orden_compra, :p_confirmada_existencia); END;`;
    const params = { p_id_orden_compra: id_orden_compra, p_confirmada_existencia: confirmada_existencia };

    try {
        const result = await executeQuery(query, params);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Cancelar orden de compra
app.post('/ordencompra/cancelar', async (req, res) => {
    const { id_orden_compra } = req.body;
    if (!id_orden_compra) {
        return res.status(400).send("El ID de la orden de compra es obligatorio");
    }

    const query = `BEGIN CancelarOrdenCompra(:p_id_orden_compra); END;`;
    const params = { p_id_orden_compra: id_orden_compra };

    try {
        const result = await executeQuery(query, params);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Eliminar orden de compra
app.post('/ordencompra/delete', async (req, res) => {
    const { id_orden_compra } = req.body;
    if (!id_orden_compra) {
        return res.status(400).send("El ID de la orden de compra es obligatorio");
    }

    const query = `BEGIN EliminarOrdenCompra(:p_id_orden_compra); END;`;
    const params = { p_id_orden_compra: id_orden_compra };

    try {
        const result = await executeQuery(query, params);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Obtener todas las órdenes de compra
app.get('/ordencompra/findall', async (req, res) => {
    const query = `SELECT * FROM TABLE(obtener_ordenes_compras())`;

    try {
        const result = await executeQuery(query);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Obtener orden de compra por ID
app.get('/ordencompra/findbyid', async (req, res) => {
    const { id } = req.query;
    if (!id) {
        return res.status(400).send("El ID de la orden de compra es obligatorio");
    }

    const query = `SELECT * FROM TABLE(obtener_ordenes_compras_id(:p_id_orden_compra))`;
    const params = { p_id_orden_compra: id };

    try {
        const result = await executeQuery(query, params);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


//-----------------------------------------------CLIENTE----------------------------------------------

// Crear cliente
app.post('/cliente/create', async (req, res) => {
    console.log(req.body)
        const { nombre, apellido, nit, pais_origen, telefono, direccion_entrega, correo_electronico, contraseña, numero_tarjeta_credito } = req.body;
    if (!nombre || !apellido || !nit || !pais_origen || !telefono || !direccion_entrega || !correo_electronico || !contraseña || !numero_tarjeta_credito) {
        return res.status(400).send("Todos los campos son obligatorios");
    }

    const query = `BEGIN InsertarCliente(:p_nombre, :p_apellido, :p_nit, :p_pais_origen, :p_telefono, :p_direccion_entrega, :p_correo_electronico, :p_contraseña, :p_numero_tarjeta_credito); END;`;
    const params = { p_nombre: nombre, p_apellido: apellido, p_nit: nit, p_pais_origen: pais_origen, p_telefono: telefono, p_direccion_entrega: direccion_entrega, p_correo_electronico: correo_electronico, p_contraseña: contraseña, p_numero_tarjeta_credito: numero_tarjeta_credito };

    try {
        const result = await executeQuery(query, params);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Actualizar cliente
app.post('/cliente/update', async (req, res) => {
    const { nombre, apellido, nit, pais_origen, telefono, direccion_entrega, correo_electronico, contraseña, numero_tarjeta_credito } = req.body;
    if (!nombre || !apellido || !nit || !pais_origen || !telefono || !direccion_entrega || !correo_electronico || !contraseña || !numero_tarjeta_credito) {
        return res.status(400).send("Todos los campos son obligatorios");
    }

    const query = `BEGIN ActualizarCliente(:p_nombre, :p_apellido, :p_nit, :p_pais_origen, :p_telefono, :p_direccion_entrega, :p_correo_electronico, :p_contraseña, :p_numero_tarjeta_credito); END;`;
    const params = { p_nombre: nombre, p_apellido: apellido, p_nit: nit, p_pais_origen: pais_origen, p_telefono: telefono, p_direccion_entrega: direccion_entrega, p_correo_electronico: correo_electronico, p_contraseña: contraseña, p_numero_tarjeta_credito: numero_tarjeta_credito };

    try {
        const result = await executeQuery(query, params);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Eliminar cliente
app.post('/cliente/delete', async (req, res) => {
    const { correo_electronico } = req.body;
    if (!correo_electronico) {
        return res.status(400).send("El correo electrónico es obligatorio");
    }

    const query = `BEGIN EliminarCliente(:p_correo_electronico); END;`;
    const params = { p_correo_electronico: correo_electronico };

    try {
        const result = await executeQuery(query, params);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Obtener todos los clientes
app.get('/cliente/findall', async (req, res) => {
    const query = `SELECT * FROM TABLE(obtener_todos_clientes())`;

    try {
        const result = await executeQuery(query);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Obtener cliente por correo electrónico
app.get('/cliente/findbyid', async (req, res) => {
    const { id } = req.query;
    if (!id) {
        return res.status(400).send("El correo electrónico es obligatorio");
    }

    const query = `SELECT * FROM TABLE(buscar_cliente_por_correo(:p_correo_electronico))`;
    const params = { p_correo_electronico: id };

    try {
        const result = await executeQuery(query, params);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


//////////--------------------------------TIPO PRODUCTO--------------------------------------------
// Crear tipo de producto
app.post('/tipoproducto/create', async (req, res) => {
    const { nombre_tipo_producto } = req.body;
    if (!nombre_tipo_producto) {
        return res.status(400).send("El nombre del tipo de producto es obligatorio");
    }

    const query = `BEGIN crear_tipo_producto(:p_nombre_tipo_producto); END;`;
    const params = { p_nombre_tipo_producto: nombre_tipo_producto };

    try {
        const result = await executeQuery(query, params);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Actualizar tipo de producto
app.post('/tipoproducto/update', async (req, res) => {
    console.log(req.body)
    const { id_tipo_producto, nombre_tipo_producto } = req.body;
    if (!id_tipo_producto || !nombre_tipo_producto) {
        return res.status(400).send("El ID y el nombre del tipo de producto son obligatorios");
    }

    const query = `BEGIN actualizar_tipo_producto(:p_id_tipo_producto, :p_nombre_tipo_producto); END;`;
    const params = { p_id_tipo_producto: id_tipo_producto, p_nombre_tipo_producto: nombre_tipo_producto };

    try {
        const result = await executeQuery(query, params);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Eliminar tipo de producto
app.post('/tipoproducto/delete', async (req, res) => {
    const { id_tipo_producto } = req.body;
    if (!id_tipo_producto) {
        return res.status(400).send("El ID del tipo de producto es obligatorio");
    }

    const query = `BEGIN eliminar_tipo_producto(:p_id_tipo_producto); END;`;
    const params = { p_id_tipo_producto: id_tipo_producto };

    try {
        const result = await executeQuery(query, params);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Obtener todos los tipos de producto
app.get('/tipoproducto/findall', async (req, res) => {
    const query = `SELECT * FROM TABLE(obtener_todos_tipos_producto)`;

    try {
        const result = await executeQuery(query);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Obtener tipo de producto por ID
app.get('/tipoproducto/findbyid', async (req, res) => {
    console.log(req.query)
    const { id } = req.query;
    if (!id) {
        return res.status(400).send("El ID del tipo de producto es obligatorio");
    }

    const query = `SELECT * FROM TABLE(buscar_tipo_producto_por_id(:p_id_tipo_producto))`;
    const params = { p_id_tipo_producto: id };

    try {
        const result = await executeQuery(query, params);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


///------------------------------------PRODUCTO-----------------------------------------
// Crear producto
app.post('/producto/create', async (req, res) => {
    console.log(req.body)
    const { codigo_unico, nombre, descripcion, id_tipo_producto, unidad_medida, precio_sin_iva, porcentaje_ganancia, cantidad_existencia, activo, imagen_producto } = req.body;
    if (!codigo_unico || !nombre || !descripcion || !id_tipo_producto || !unidad_medida || !precio_sin_iva || !porcentaje_ganancia || !cantidad_existencia || !activo) {
        return res.status(400).send("Todos los campos son obligatorios");
    }

    const query = `BEGIN InsertarProducto(:p_codigo_unico, :p_nombre, :p_descripcion, :p_id_tipo_producto, :p_unidad_medida, :p_precio_sin_iva, :p_porcentaje_ganancia, :p_cantidad_existencia, :p_activo, :p_imagen_producto); END;`;
    const params = { 
        p_codigo_unico: codigo_unico,
        p_nombre: nombre,
        p_descripcion: descripcion,
        p_id_tipo_producto: id_tipo_producto,
        p_unidad_medida: unidad_medida,
        p_precio_sin_iva: precio_sin_iva,
        p_porcentaje_ganancia: porcentaje_ganancia,
        p_cantidad_existencia: cantidad_existencia,
        p_activo: activo,
        p_imagen_producto: null
    };

    try {
        const result = await executeQuery(query, params);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Actualizar producto
app.post('/producto/update', async (req, res) => {
    const { id_producto, codigo_unico, nombre, descripcion, id_tipo_producto, unidad_medida, precio_sin_iva, porcentaje_ganancia, cantidad_existencia, activo, imagen_producto } = req.body;
    if (!id_producto || !codigo_unico || !nombre || !descripcion || !id_tipo_producto || !unidad_medida || !precio_sin_iva || !porcentaje_ganancia || !cantidad_existencia || !activo) {
        return res.status(400).send("Todos los campos son obligatorios");
    }

    const query = `BEGIN ActualizarProducto(:p_id_producto, :p_codigo_unico, :p_nombre, :p_descripcion, :p_id_tipo_producto, :p_unidad_medida, :p_precio_sin_iva, :p_porcentaje_ganancia, :p_cantidad_existencia, :p_activo, :p_imagen_producto); END;`;
    const params = { 
        p_id_producto: id_producto,
        p_codigo_unico: codigo_unico,
        p_nombre: nombre,
        p_descripcion: descripcion,
        p_id_tipo_producto: id_tipo_producto,
        p_unidad_medida: unidad_medida,
        p_precio_sin_iva: precio_sin_iva,
        p_porcentaje_ganancia: porcentaje_ganancia,
        p_cantidad_existencia: cantidad_existencia,
        p_activo: activo,
        p_imagen_producto: null
    };

    try {
        const result = await executeQuery(query, params);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Eliminar producto
app.post('/producto/delete', async (req, res) => {
    const { id_producto } = req.body;
    if (!id_producto) {
        return res.status(400).send("El ID del producto es obligatorio");
    }

    const query = `BEGIN EliminarProducto(:p_id_producto); END;`;
    const params = { p_id_producto: id_producto };

    try {
        const result = await executeQuery(query, params);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Obtener todos los productos
app.get('/producto/findall', async (req, res) => {
    const query = `SELECT * FROM TABLE(obtener_todos_productos)`;

    try {
        const result = await executeQuery(query);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Obtener producto por ID
app.get('/producto/findbyid', async (req, res) => {
    const { id } = req.query;
    if (!id) {
        return res.status(400).send("El ID del producto es obligatorio");
    }

    const query = `SELECT * FROM TABLE(buscar_producto_por_id(:p_id_producto))`;
    const params = { p_id_producto: id };

    try {
        const result = await executeQuery(query, params);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


//-------------------USUARIO-----------------------------------------------------------------------

// Crear
app.post('/usuario/create', async (req, res) => {
    console.log(req.body)
    const { correo, clave, nombre, apellido, tipoUsuario } = req.body;
    if (!correo || !clave || !nombre || !apellido || !tipoUsuario) {
        return res.status(400).send("Todos los campos son obligatorios");
    }

    const query = `BEGIN InsertarUsuario(:p_correo_electronico, :p_clave, :p_nombre, :p_apellido, :p_tipo_usuario); END;`;
    const params = { p_correo_electronico: correo, p_clave: clave, p_nombre: nombre, p_apellido: apellido, p_tipo_usuario: tipoUsuario };

    try {
        const result = await executeQuery(query, params);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Actualizar
app.post('/usuario/update', async (req, res) => {
    const { correo, clave, nombre, apellido, tipoUsuario } = req.body;
    if (!correo || !clave || !nombre || !apellido || !tipoUsuario) {
        return res.status(400).send("Todos los campos son obligatorios");
    }

    const query = `BEGIN ActualizarUsuario(:p_correo_electronico, :p_clave, :p_nombre, :p_apellido, :p_tipo_usuario); END;`;
    const params = { p_correo_electronico: correo, p_clave: clave, p_nombre: nombre, p_apellido: apellido, p_tipo_usuario: tipoUsuario };

    try {
        const result = await executeQuery(query, params);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Eliminar
app.post('/usuario/delete', async (req, res) => {
    const { correo } = req.body;
    if (!correo) {
        return res.status(400).send("El correo es obligatorio");
    }

    const query = `BEGIN EliminarUsuario(:p_correo_electronico); END;`;
    const params = { p_correo_electronico: correo };

    try {
        const result = await executeQuery(query, params);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Obtener todo
app.get('/usuario/findall', async (req, res) => {
    const query = `SELECT * FROM TABLE(obtener_todos_usuarios())`;

    try {
        const result = await executeQuery(query);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Obtener por id
app.get('/usuario/findbyid', async (req, res) => {
    
    const { id } = req.query;

    if (!id) {
        return res.status(400).send("El correo es obligatorio");
    }

    const query = `SELECT * FROM TABLE(buscar_usuario_por_correo(:p_correo))`;
    const params = { p_correo: id };

    try {
        const result = await executeQuery(query, params);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


///--------------------------------------PEDIDO-----------------------------------------------------------
// Crear pedido
app.post('/pedido/create', async (req, res) => {
    const { id_usuario, id_producto, cantidad } = req.body;
    if (!id_usuario || !id_producto || !cantidad) {
        return res.status(400).send("Todos los campos son obligatorios");
    }

    const query = `BEGIN CrearPedido(:p_id_usuario, :p_id_producto, :p_cantidad); END;`;
    const params = { 
        p_id_usuario: id_usuario,
        p_id_producto: id_producto,
        p_cantidad: cantidad
    };

    try {
        const result = await executeQuery(query, params);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Actualizar pedido
app.post('/pedido/update', async (req, res) => {
    const { id_pedido, id_usuario, id_producto, cantidad } = req.body;
    if (!id_pedido || !id_usuario || !id_producto || !cantidad) {
        return res.status(400).send("Todos los campos son obligatorios");
    }

    const query = `BEGIN ActualizarPedido(:p_id_pedido, :p_id_usuario, :p_id_producto, :p_cantidad); END;`;
    const params = { 
        p_id_pedido: id_pedido,
        p_id_usuario: id_usuario,
        p_id_producto: id_producto,
        p_cantidad: cantidad
    };

    try {
        const result = await executeQuery(query, params);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Finalizar pedido
app.post('/pedido/finalizar', async (req, res) => {
    const { id_pedido } = req.body;
    if (!id_pedido) {
        return res.status(400).send("El ID del pedido es obligatorio");
    }

    const query = `BEGIN FinalizarPedido(:p_id_pedido); END;`;
    const params = { p_id_pedido: id_pedido };

    try {
        const result = await executeQuery(query, params);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Cancelar pedido
app.post('/pedido/cancelar', async (req, res) => {
    const { id_pedido } = req.body;
    if (!id_pedido) {
        return res.status(400).send("El ID del pedido es obligatorio");
    }

    const query = `BEGIN CancelarPedido(:p_id_pedido); END;`;
    const params = { p_id_pedido: id_pedido };

    try {
        const result = await executeQuery(query, params);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Eliminar pedido
app.post('/pedido/delete', async (req, res) => {
    const { id_pedido } = req.body;
    if (!id_pedido) {
        return res.status(400).send("El ID del pedido es obligatorio");
    }

    const query = `BEGIN EliminarPedido(:p_id_pedido); END;`;
    const params = { p_id_pedido: id_pedido };

    try {
        const result = await executeQuery(query, params);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Obtener todos los pedidos
app.get('/pedido/findall', async (req, res) => {
    const query = `SELECT * FROM TABLE(ObtenerTodosPedidos())`;

    try {
        const result = await executeQuery(query);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Obtener pedido por ID
app.get('/pedido/findbyid', async (req, res) => {
    const { id } = req.query;
    if (!id) {
        return res.status(400).send("El ID del pedido es obligatorio");
    }

    const query = `SELECT * FROM TABLE(ObtenerPedidoPorID(:p_id_pedido))`;
    const params = { p_id_pedido: id };

    try {
        const result = await executeQuery(query, params);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


//--------------------------------------DETALLE ORDEN COMPRA --------------------------------------------
// Crear detalle de orden de compra
app.post('/detalleordencompra/create', async (req, res) => {
    const { id_orden_compra, id_producto, cantidad, precio_unitario } = req.body;
    if (!id_orden_compra || !id_producto || !cantidad || !precio_unitario) {
        return res.status(400).send("Todos los campos son obligatorios");
    }

    const query = `BEGIN InsertarDetalleOrdenCompra(:p_id_orden_compra, :p_id_producto, :p_cantidad, :p_precio_unitario); END;`;
    const params = { 
        p_id_orden_compra: id_orden_compra,
        p_id_producto: id_producto,
        p_cantidad: cantidad,
        p_precio_unitario: precio_unitario
    };

    try {
        const result = await executeQuery(query, params);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Actualizar detalle de orden de compra
app.post('/detalleordencompra/update', async (req, res) => {
    const { id_detalle_orden_compra, id_orden_compra, id_producto, cantidad, precio_unitario } = req.body;
    if (!id_detalle_orden_compra || !id_orden_compra || !id_producto || !cantidad || !precio_unitario) {
        return res.status(400).send("Todos los campos son obligatorios");
    }

    const query = `BEGIN ActualizarDetalleOrdenCompra(:p_id_detalle_orden_compra, :p_id_orden_compra, :p_id_producto, :p_cantidad, :p_precio_unitario); END;`;
    const params = { 
        p_id_detalle_orden_compra: id_detalle_orden_compra,
        p_id_orden_compra: id_orden_compra,
        p_id_producto: id_producto,
        p_cantidad: cantidad,
        p_precio_unitario: precio_unitario
    };

    try {
        const result = await executeQuery(query, params);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Eliminar detalle de orden de compra
app.post('/detalleordencompra/delete', async (req, res) => {
    const { id_detalle_orden_compra } = req.body;
    if (!id_detalle_orden_compra) {
        return res.status(400).send("El ID del detalle de la orden de compra es obligatorio");
    }

    const query = `BEGIN EliminarDetalleOrdenCompra(:p_id_detalle_orden_compra); END;`;
    const params = { p_id_detalle_orden_compra: id_detalle_orden_compra };

    try {
        const result = await executeQuery(query, params);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Obtener todos los detalles de orden de compra
app.get('/detalleordencompra/findall', async (req, res) => {
    const query = `SELECT * FROM TABLE(obtener_todos_detalles_orden_compra)`;

    try {
        const result = await executeQuery(query);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Obtener detalle de orden de compra por ID
app.get('/detalleordencompra/findbyid', async (req, res) => {
    const { id } = req.query;
    if (!id) {
        return res.status(400).send("El ID del detalle de la orden de compra es obligatorio");
    }

    const query = `SELECT * FROM TABLE(buscar_detalle_orden_compra_por_id(:p_id_detalle_orden_compra))`;
    const params = { p_id_detalle_orden_compra: id };

    try {
        const result = await executeQuery(query, params);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


//----------------------------------------FACTURA ----------------------------------------------------------
// Crear factura
app.post('/factura/create', async (req, res) => {
    const { id_usuario, id_pedido } = req.body;
    if (!id_usuario || !id_pedido) {
        return res.status(400).send("Se requieren el ID de usuario y el ID de pedido");
    }

    const query = `BEGIN InsertarFactura(:p_id_usuario, :p_id_pedido); END;`;
    const params = { 
        p_id_usuario: id_usuario,
        p_id_pedido: id_pedido
    };

    try {
        const result = await executeQuery(query, params);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Actualizar factura
app.post('/factura/update', async (req, res) => {
    const { id_factura, id_usuario, id_pedido } = req.body;
    if (!id_factura || !id_usuario || !id_pedido) {
        return res.status(400).send("Se requieren el ID de factura, el ID de usuario y el ID de pedido");
    }

    const query = `BEGIN ActualizarFactura(:p_id_factura, :p_id_usuario, :p_id_pedido); END;`;
    const params = { 
        p_id_factura: id_factura,
        p_id_usuario: id_usuario,
        p_id_pedido: id_pedido
    };

    try {
        const result = await executeQuery(query, params);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Anular factura
app.post('/factura/cancelar', async (req, res) => {
    const { id_factura } = req.body;
    if (!id_factura) {
        return res.status(400).send("Se requiere el ID de factura");
    }

    const query = `BEGIN AnularFactura(:p_id_factura); END;`;
    const params = { p_id_factura: id_factura };

    try {
        const result = await executeQuery(query, params);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Eliminar factura
app.post('/factura/delete', async (req, res) => {
    const { id_factura } = req.body;
    if (!id_factura) {
        return res.status(400).send("Se requiere el ID de factura");
    }

    const query = `BEGIN EliminarFactura(:p_id_factura); END;`;
    const params = { p_id_factura: id_factura };

    try {
        const result = await executeQuery(query, params);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Obtener todas las facturas
app.get('/factura/findall', async (req, res) => {
    const query = `SELECT * FROM TABLE(Obtener_Todas_Las_Facturas())`;

    try {
        const result = await executeQuery(query);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Obtener factura por ID
app.get('/factura/findbyid', async (req, res) => {
    const { id } = req.query;
    if (!id) {
        return res.status(400).send("Se requiere el ID de factura");
    }

    const query = `SELECT * FROM TABLE(Obtener_FacturaPorID(:p_id_factura))`;
    const params = { p_id_factura: id };

    try {
        const result = await executeQuery(query, params);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


///----------------------------------- DETALLE PEDIDO ----------------------------------
// Crear detalle de pedido
app.post('/detallepedido/create', async (req, res) => {
    const { id_pedido, id_producto, cantidad, precio_venta_unitario } = req.body;
    if (!id_pedido || !id_producto || !cantidad || !precio_venta_unitario) {
        return res.status(400).send("Se requieren todos los campos");
    }

    const query = `BEGIN InsertarDetallePedido(:p_id_pedido, :p_id_producto, :p_cantidad, :p_precio_venta_unitario); END;`;
    const params = {
        p_id_pedido: id_pedido,
        p_id_producto: id_producto,
        p_cantidad: cantidad,
        p_precio_venta_unitario: precio_venta_unitario
    };

    try {
        const result = await executeQuery(query, params);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Actualizar detalle de pedido
app.post('/detallepedido/update', async (req, res) => {
    const { id_detalle_pedido, id_pedido, id_producto, cantidad, precio_venta_unitario } = req.body;
    if (!id_detalle_pedido || !id_pedido || !id_producto || !cantidad || !precio_venta_unitario) {
        return res.status(400).send("Se requieren todos los campos");
    }

    const query = `BEGIN ActualizarDetallePedido(:p_id_detalle_pedido, :p_id_pedido, :p_id_producto, :p_cantidad, :p_precio_venta_unitario); END;`;
    const params = {
        p_id_detalle_pedido: id_detalle_pedido,
        p_id_pedido: id_pedido,
        p_id_producto: id_producto,
        p_cantidad: cantidad,
        p_precio_venta_unitario: precio_venta_unitario
    };

    try {
        const result = await executeQuery(query, params);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Eliminar detalle de pedido
app.post('/detallepedido/delete', async (req, res) => {
    const { id_detalle_pedido } = req.body;
    if (!id_detalle_pedido) {
        return res.status(400).send("Se requiere el ID de detalle de pedido");
    }

    const query = `BEGIN EliminarDetallePedido(:p_id_detalle_pedido); END;`;
    const params = { p_id_detalle_pedido: id_detalle_pedido };

    try {
        const result = await executeQuery(query, params);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Obtener todos los detalles de pedido
app.get('/detallepedido/findall', async (req, res) => {
    const query = `SELECT * FROM TABLE(obtener_todos_detalles_pedido())`;

    try {
        const result = await executeQuery(query);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Obtener detalle de pedido por ID
app.get('/detallepedido/findbyid', async (req, res) => {
    const { id } = req.query;
    if (!id) {
        return res.status(400).send("Se requiere el ID de detalle de pedido");
    }

    const query = `SELECT * FROM TABLE(ObtenerDetallePedidoPorID(:p_id_detalle_pedido))`;
    const params = { p_id_detalle_pedido: id };

    try {
        const result = await executeQuery(query, params);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
