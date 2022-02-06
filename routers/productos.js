const express = require("express");
const { status } = require("express/lib/response");
const router = express.Router();
const arrProductos = [];
let id = 1;

//POST Agrega los productos al array con los datos ingresados desde el FORM de HTML. Le agrego el ID.
router.post("/",(req,res)=>{
    if(req.body.nombre !== undefined && req.body.precio !== undefined && req.body.foto !== undefined){
        req.body.id = id;
        let agrego = req.body;
        arrProductos.push(agrego);
        res.send(agrego);
        id++;
    }
    else{
        res.send({error:"Revisar los datos"});
    }
});


//GET devuelve todos los productos dentro del array.
router.get("/",(req, res)=>{
  res.send(arrProductos);
});


//GET ruta con /:id devuelve el producto con el ID seleccionado en la ruta.
router.get("/:id",(req, res, next)=>{
    let idProducto = parseInt(req.params.id); //es el :id de la ruta
    
    if ( !isNaN(idProducto) ){ //verifico que el :id ingresado sea un numero
                      let producto = arrProductos.find(arrProductos => arrProductos.id === idProducto); //busco dentro del array el ID ingresado
        if(producto !== undefined) {  //verifico que el :id ingresado exista dentro del array
                        res.send(producto);
        }else {
               res.send('El id ingresado todavía no existe');
        }
    }else{
      res.send('El id ingresado no es numerico');
    } 
    next();   
});


router.delete('/:id', (req, res, next) =>{
   let idProductodel = parseInt(req.params.id);
   idProducto = idProductodel - 1; //Acomodo el ID ingresado para que pueda manejarlo con loas presentaciones y con el splice
  
   if ( !isNaN(idProducto) ){
                     let productodel = arrProductos.find(arrProductos => arrProductos.id === idProductodel);
 
      if(productodel !== undefined) {
                      res.send(productodel);
                      arrProductos.splice(idProducto,1);
      }else {
             res.send('El id ingresado todavía no existe del delete');
      }
    }else{
     res.send('El id ingresado no es numerico Respuesta desde el DELETE');
    } 
   next();   
 });


 router.put('/:id', (req, res, next) =>{
  let idProductoput = parseInt(req.params.id);

  if ( !isNaN(idProductoput) ){
                    let productoput = arrProductos.find(arrProductos => arrProductos.id === idProductoput);
                    
        if(productoput !== undefined) {
              Object.defineProperties(arrProductos.find(arrProductos => arrProductos.id === idProductoput), {
                'nombre': {
                    value: req.body.nombre
                },
                'precio': {
                    value: req.body.precio
                },
                'foto': {
                    value: req.body.foto
                }
               })
            res.send(`Se actualizó el producto con id:${req.params.id} Nombre:${req.body.nombre} Precio:${req.body.precio} Foto:${req.body.foto}`);
        }else {
            res.send('El id ingresado todavía no existe desde el PUT');
  }
  }else{
    res.send('El id ingresado no es numerico Respuesta desde el PUT');
  } 
  next();   
});

module.exports = router;