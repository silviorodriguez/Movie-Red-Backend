const { Router } = require('express')
const { movieGet, moviePost, moviePut, movieDel, movieGetById } = require('../controllers/movies')
const { protect } = require('../middlewares/authMiddleware')

const router = Router()

router.get('/', movieGet)
router.post('/', protect, moviePost)
router.put('/:id', protect, moviePut)
router.delete('/:id', protect, movieDel)
router.get('/:id', movieGetById)


module.exports = router
