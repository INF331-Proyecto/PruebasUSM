import { response } from "express"


const getProducts = async (req, res = response) => {
    res.json({
        msg: 'get API - controller'
    })
}

//export
export {
    getProducts
}