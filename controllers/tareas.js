const asyncHandler = require('express-async-handler')
const Tarea = require('../models/tarea')

const getTareas = asyncHandler(async (req, res) => {
    const tareas = await Tarea.find({ user: req.user.id})
    res.status(200).json(tareas)
})

const setTarea = asyncHandler(async (req, res) => {
    if (!req.body.texto) {
        res.status(400)
        throw new Error('Favor de teclear la descripción de la tarea')
    }

    const tarea = await Tarea.create({
        texto: req.body.texto,
        user: req.user.id
    })

    res.status(201).json(tarea)
})

const updateTarea = asyncHandler(async (req, res) => {
    const tarea = await Tarea.findById(req.params.id)

    if (!tarea) {
        res.status(400)
        throw new Error('Tarea no encontrada')
    }

    // verificar que la tarea pertenezca al usuario logeado
    if (tarea.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Acceso no autorizado')
    }else{
        const updatedTarea = await Tarea.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json(updatedTarea)
    }

   
})

const deleteTarea = asyncHandler(async (req, res) => {
    const tarea = await Tarea.findById(req.params.id)

    if (!tarea) {
        res.status(404)
        throw new Error('Tarea no encontrada')
    }
    if (tarea.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Acceso no autorizado')
    }

    await tarea.deleteOne()

    res.status(200).json({ message: 'Tarea eliminada', id: req.params.id })
})  

module.exports = {
    getTareas,
    setTarea,
    updateTarea,
    deleteTarea
}