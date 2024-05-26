const express = require('express');
const oracledb = require('oracledb');
const cors = require('cors');
const app = express();
const PORT = 5000;



app.use(cors());
app.use(express.json()); // Middleware para analizar el cuerpo de las solicitudes JSON

app.get('/hello', (req, res) => {
    res.send('Hello');
})

//--------------METODOS POST ------------------------------------------

//-------CREAR CLIENTE -------
app.post('/clientescreate', async (req, res) => {
    // Obtener los datos del cuerpo de la solicitud
    console.log(req.body);
    const { clienteId, nombre, apellido, nit, paisOrigen, telefono, direccionEntrega, correo, noTarjetaCredito } = req.body;

    async function insertarCliente() {
        let connection;
        try {
            connection = await oracledb.getConnection({
                user: 'ALUMNO',
                password: 'Umg$2024',
                connectionString: 'localhost/xe'
            });

            const result = await connection.execute(
                `INSERT INTO cliente (id_cliente, nombre, apellido, nit, pais_origen, telefono, direccion_entrega, correo_electronico, numero_tarjeta_credito) VALUES (:clienteId, :nombre, :apellido, :nit, :paisOrigen, :telefono, :direccionEntrega, :correo, :noTarjetaCredito)`,
                [clienteId, nombre, apellido, nit, paisOrigen, telefono, direccionEntrega, correo, noTarjetaCredito]
            );
            
            // Realizar commit de la transacción
            await connection.commit();
            console.log(result);
            return result;
        } catch (error) {
            if (connection) {
                // Deshacer cambios si hay un error
                await connection.rollback();
            }
            return error;
        } finally {
            if (connection) {
                // Cerrar la conexión
                await connection.close();
            }
        }
    }

    insertarCliente()
        .then(dbRes => { res.send(dbRes); })
        .catch(err => { res.send(err); });
});

//-------CREAR DETALLE ORDEN COMPRA -------
app.post('/detalleordencompracreate', async (req, res) => {
    // Obtener los datos del cuerpo de la solicitud
    console.log(req.body);
    const { idDetalleORdenCompra, idOrdenCompra, idProducto, cantidad, precioUnitario} = req.body;

    async function insertarDatos() {
        let connection;
        try {
            connection = await oracledb.getConnection({
                user: 'ALUMNO',
                password: 'Umg$2024',
                connectionString: 'localhost/xe'
            });

            const result = await connection.execute(
                `INSERT INTO Detalle_Orden_Compra (ID_DETALLE_ORDEN_COMPRA, ID_ORDEN_COMPRA, ID_PRODUCTO, cantidad, precio_unitario) VALUES (:idDetalleORdenCompra, :idOrdenCompra, :idProducto, :cantidad, :precioUnitario)`,
                [idDetalleORdenCompra, idOrdenCompra, idProducto, cantidad, precioUnitario]
            );
            
            // Realizar commit de la transacción
            await connection.commit();
            console.log(result);
            return result;
        } catch (error) {
            if (connection) {
                // Deshacer cambios si hay un error
                await connection.rollback();
            }
            return error;
        } finally {
            if (connection) {
                // Cerrar la conexión
                await connection.close();
            }
        }
    }

    insertarDatos()
        .then(dbRes => { res.send(dbRes); })
        .catch(err => { res.send(err); });
});

//-------CREAR DETALLE PEDIDO -------
app.post('/detallepedidocreate', async (req, res) => {
    // Obtener los datos del cuerpo de la solicitud
    console.log(req.body);
    const { idDetalleORdenCompra, idOrdenCompra, idProducto, cantidad, precioUnitario} = req.body;

    async function insertarDatos() {
        let connection;
        try {
            connection = await oracledb.getConnection({
                user: 'ALUMNO',
                password: 'Umg$2024',
                connectionString: 'localhost/xe'
            });

            const result = await connection.execute(
                `INSERT INTO Detalle_Orden_Compra (ID_DETALLE_ORDEN_COMPRA, ID_ORDEN_COMPRA, ID_PRODUCTO, cantidad, precio_unitario) VALUES (:idDetalleORdenCompra, :idOrdenCompra, :idProducto, :cantidad, :precioUnitario)`,
                [idDetalleORdenCompra, idOrdenCompra, idProducto, cantidad, precioUnitario]
            );
            
            // Realizar commit de la transacción
            await connection.commit();
            console.log(result);
            return result;
        } catch (error) {
            if (connection) {
                // Deshacer cambios si hay un error
                await connection.rollback();
            }
            return error;
        } finally {
            if (connection) {
                // Cerrar la conexión
                await connection.close();
            }
        }
    }

    insertarDatos()
        .then(dbRes => { res.send(dbRes); })
        .catch(err => { res.send(err); });
});

//-------CREAR FACTURA -------
app.post('/facturacreate', async (req, res) => {
    // Obtener los datos del cuerpo de la solicitud
    console.log(req.body);
    const { idDetalleORdenCompra, idOrdenCompra, idProducto, cantidad, precioUnitario} = req.body;

    async function insertarDatos() {
        let connection;
        try {
            connection = await oracledb.getConnection({
                user: 'ALUMNO',
                password: 'Umg$2024',
                connectionString: 'localhost/xe'
            });

            const result = await connection.execute(
                `INSERT INTO Detalle_Orden_Compra (ID_DETALLE_ORDEN_COMPRA, ID_ORDEN_COMPRA, ID_PRODUCTO, cantidad, precio_unitario) VALUES (:idDetalleORdenCompra, :idOrdenCompra, :idProducto, :cantidad, :precioUnitario)`,
                [idDetalleORdenCompra, idOrdenCompra, idProducto, cantidad, precioUnitario]
            );
            
            // Realizar commit de la transacción
            await connection.commit();
            console.log(result);
            return result;
        } catch (error) {
            if (connection) {
                // Deshacer cambios si hay un error
                await connection.rollback();
            }
            return error;
        } finally {
            if (connection) {
                // Cerrar la conexión
                await connection.close();
            }
        }
    }

    insertarDatos()
        .then(dbRes => { res.send(dbRes); })
        .catch(err => { res.send(err); });
});

//-------CREAR ORDEN COMPRA -------
app.post('/ordencompracreate', async (req, res) => {
    // Obtener los datos del cuerpo de la solicitud
    console.log(req.body);
    const { idDetalleORdenCompra, idOrdenCompra, idProducto, cantidad, precioUnitario} = req.body;

    async function insertarDatos() {
        let connection;
        try {
            connection = await oracledb.getConnection({
                user: 'ALUMNO',
                password: 'Umg$2024',
                connectionString: 'localhost/xe'
            });

            const result = await connection.execute(
                `INSERT INTO Detalle_Orden_Compra (ID_DETALLE_ORDEN_COMPRA, ID_ORDEN_COMPRA, ID_PRODUCTO, cantidad, precio_unitario) VALUES (:idDetalleORdenCompra, :idOrdenCompra, :idProducto, :cantidad, :precioUnitario)`,
                [idDetalleORdenCompra, idOrdenCompra, idProducto, cantidad, precioUnitario]
            );
            
            // Realizar commit de la transacción
            await connection.commit();
            console.log(result);
            return result;
        } catch (error) {
            if (connection) {
                // Deshacer cambios si hay un error
                await connection.rollback();
            }
            return error;
        } finally {
            if (connection) {
                // Cerrar la conexión
                await connection.close();
            }
        }
    }

    insertarDatos()
        .then(dbRes => { res.send(dbRes); })
        .catch(err => { res.send(err); });
});

//-------CREAR PEDIDO -------
app.post('/pedidocreate', async (req, res) => {
    // Obtener los datos del cuerpo de la solicitud
    console.log(req.body);
    const { idDetalleORdenCompra, idOrdenCompra, idProducto, cantidad, precioUnitario} = req.body;

    async function insertarDatos() {
        let connection;
        try {
            connection = await oracledb.getConnection({
                user: 'ALUMNO',
                password: 'Umg$2024',
                connectionString: 'localhost/xe'
            });

            const result = await connection.execute(
                `INSERT INTO Detalle_Orden_Compra (ID_DETALLE_ORDEN_COMPRA, ID_ORDEN_COMPRA, ID_PRODUCTO, cantidad, precio_unitario) VALUES (:idDetalleORdenCompra, :idOrdenCompra, :idProducto, :cantidad, :precioUnitario)`,
                [idDetalleORdenCompra, idOrdenCompra, idProducto, cantidad, precioUnitario]
            );
            
            // Realizar commit de la transacción
            await connection.commit();
            console.log(result);
            return result;
        } catch (error) {
            if (connection) {
                // Deshacer cambios si hay un error
                await connection.rollback();
            }
            return error;
        } finally {
            if (connection) {
                // Cerrar la conexión
                await connection.close();
            }
        }
    }

    insertarDatos()
        .then(dbRes => { res.send(dbRes); })
        .catch(err => { res.send(err); });
});

//-------CREAR PRODUCTO -------
app.post('/productocreate', async (req, res) => {
    // Obtener los datos del cuerpo de la solicitud
    console.log(req.body);
    const { idDetalleORdenCompra, idOrdenCompra, idProducto, cantidad, precioUnitario} = req.body;

    async function insertarDatos() {
        let connection;
        try {
            connection = await oracledb.getConnection({
                user: 'ALUMNO',
                password: 'Umg$2024',
                connectionString: 'localhost/xe'
            });

            const result = await connection.execute(
                `INSERT INTO Detalle_Orden_Compra (ID_DETALLE_ORDEN_COMPRA, ID_ORDEN_COMPRA, ID_PRODUCTO, cantidad, precio_unitario) VALUES (:idDetalleORdenCompra, :idOrdenCompra, :idProducto, :cantidad, :precioUnitario)`,
                [idDetalleORdenCompra, idOrdenCompra, idProducto, cantidad, precioUnitario]
            );
            
            // Realizar commit de la transacción
            await connection.commit();
            console.log(result);
            return result;
        } catch (error) {
            if (connection) {
                // Deshacer cambios si hay un error
                await connection.rollback();
            }
            return error;
        } finally {
            if (connection) {
                // Cerrar la conexión
                await connection.close();
            }
        }
    }

    insertarDatos()
        .then(dbRes => { res.send(dbRes); })
        .catch(err => { res.send(err); });
});

//-------CREAR PROVEEDOR -------
app.post('/proveedorcreate', async (req, res) => {
    // Obtener los datos del cuerpo de la solicitud
    console.log(req.body);
    const { idDetalleORdenCompra, idOrdenCompra, idProducto, cantidad, precioUnitario} = req.body;

    async function insertarDatos() {
        let connection;
        try {
            connection = await oracledb.getConnection({
                user: 'ALUMNO',
                password: 'Umg$2024',
                connectionString: 'localhost/xe'
            });

            const result = await connection.execute(
                `INSERT INTO Detalle_Orden_Compra (ID_DETALLE_ORDEN_COMPRA, ID_ORDEN_COMPRA, ID_PRODUCTO, cantidad, precio_unitario) VALUES (:idDetalleORdenCompra, :idOrdenCompra, :idProducto, :cantidad, :precioUnitario)`,
                [idDetalleORdenCompra, idOrdenCompra, idProducto, cantidad, precioUnitario]
            );
            
            // Realizar commit de la transacción
            await connection.commit();
            console.log(result);
            return result;
        } catch (error) {
            if (connection) {
                // Deshacer cambios si hay un error
                await connection.rollback();
            }
            return error;
        } finally {
            if (connection) {
                // Cerrar la conexión
                await connection.close();
            }
        }
    }

    insertarDatos()
        .then(dbRes => { res.send(dbRes); })
        .catch(err => { res.send(err); });
});

//-------CREAR TIPO DE PRODUCTO -------
app.post('/tipoproductocreate', async (req, res) => {
    // Obtener los datos del cuerpo de la solicitud
    console.log(req.body);
    const { idDetalleORdenCompra, idOrdenCompra, idProducto, cantidad, precioUnitario} = req.body;

    async function insertarDatos() {
        let connection;
        try {
            connection = await oracledb.getConnection({
                user: 'ALUMNO',
                password: 'Umg$2024',
                connectionString: 'localhost/xe'
            });

            const result = await connection.execute(
                `INSERT INTO Detalle_Orden_Compra (ID_DETALLE_ORDEN_COMPRA, ID_ORDEN_COMPRA, ID_PRODUCTO, cantidad, precio_unitario) VALUES (:idDetalleORdenCompra, :idOrdenCompra, :idProducto, :cantidad, :precioUnitario)`,
                [idDetalleORdenCompra, idOrdenCompra, idProducto, cantidad, precioUnitario]
            );
            
            // Realizar commit de la transacción
            await connection.commit();
            console.log(result);
            return result;
        } catch (error) {
            if (connection) {
                // Deshacer cambios si hay un error
                await connection.rollback();
            }
            return error;
        } finally {
            if (connection) {
                // Cerrar la conexión
                await connection.close();
            }
        }
    }

    insertarDatos()
        .then(dbRes => { res.send(dbRes); })
        .catch(err => { res.send(err); });
});

//-------CREAR USUARIO -------
// app.post('/usuariocreate', async (req, res) => {
//     console.log(req.body);
//     // Obtener los datos del cuerpo de la solicitud
//     const { correo, claveUser, nombre, apellido, tipoUsuario } = req.body;

//     async function insertarUsuario() {
//         let connection;
//         try {
//             connection = await oracledb.getConnection({
//                 user: 'ALUMNO',
//                 password: 'Umg$2024',
//                 connectionString: 'localhost/xe'
//             });

//             const result = await connection.execute(
//                 `BEGIN InsertarUsuario(:correo, :clave, :nombre, :apellido, :tipoUsuario); END;`,
//                 { correo, clave: claveUser, nombre, apellido, tipoUsuario }
//             );

//             // Realizar commit de la transacción
//             await connection.commit();
//             console.log(result);
//             return result;
//         } catch (error) {
//             if (connection) {
//                 // Deshacer cambios si hay un error
//                 await connection.rollback();
//             }
//             return error;
//         } finally {
//             if (connection) {
//                 // Cerrar la conexión
//                 await connection.close();
//             }
//         }
//     }

//     insertarUsuario()
//         .then(dbRes => { res.send(dbRes); })
//         .catch(err => { res.send(err); });
// });

app.post('/usuariocreate', async (req, res) => {
    console.log(req.body);
    // Obtener los datos del cuerpo de la solicitud
    const { correo, claveUser, nombre, apellido, tipoUsuario } = req.body;

    async function insertarUsuario() {
        let connection;
        try {
            connection = await oracledb.getConnection({
                user: 'ALUMNO',
                password: 'Umg$2024',
                connectString: 'localhost/xe' // La propiedad se llama connectString en lugar de connectionString
            });

            const result = await connection.execute(
                `BEGIN InsertarUsuario(:p_correo_electronico, :p_clave, :p_nombre, :p_apellido, :p_tipo_usuario); END;`,
                { p_correo_electronico: correo, p_clave: claveUser, p_nombre: nombre, p_apellido: apellido, p_tipo_usuario: tipoUsuario }
            );

            // Realizar commit de la transacción
            await connection.commit();
            console.log(result);
            return result;
        } catch (error) {
            if (connection) {
                // Deshacer cambios si hay un error
                await connection.rollback();
            }
            return error;
        } finally {
            if (connection) {
                // Cerrar la conexión
                await connection.close();
            }
        }
    }

    insertarUsuario()
    .then(dbRes => {console.log("🚀 ~ app.post ~ dbRes:", dbRes); res.send(dbRes); })
    
   .catch(err => { res.send(err); });
});
        



//--------------METODOS GET ------------------------------------------

//----------GET CLIENTES ------
app.get('/clientes', async (req, res) => {
    const { correo } = req.query;

    async function getData() {
        try {
            const connection = await oracledb.getConnection({
                user: 'ALUMNO',
                password: 'Umg$2024',
                connectionString: 'localhost/xe'
            });

            const result = await connection.execute('SELECT * FROM (SELECT *FROM CLIENTE WHERE correo_electronico = :correo ORDER BY rownum) WHERE ROWNUM <= 1', [correo]);
            console.log(result);
            return result;
        } catch (error) {
            return error;
        }
    }

    try {
        const dbRes = await getData();
        res.send(dbRes);
    } catch (err) {
        res.send(err);
    }
});

//----------GET USUARIOS ------
app.get('/usuario', async (req, res) => {
    const { correo } = req.query;

    async function getData() {
        try {
            const connection = await oracledb.getConnection({
                user: 'ALUMNO',
                password: 'Umg$2024',
                connectionString: 'localhost/xe'
            });

            const result = await connection.execute('SELECT * FROM (SELECT *FROM USUARIO WHERE correo_electronico = :correo ORDER BY rownum) WHERE ROWNUM <= 1', [correo]);
            console.log(result);
            return result;
        } catch (error) {
            return error;
        }
    }

    try {
        const dbRes = await getData();
        res.send(dbRes);
    } catch (err) {
        res.send(err);
    }
});


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

