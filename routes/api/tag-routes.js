const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  try { 
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong in tag-routes get:1', error: error.message });
  }
});

router.get('/:id', async(req, res) => {
  // find a single tag by its `id`
  try { 
    const tagData = await Tag.findByPk(req.params.id, { // find by primary key
      include: [{ model: Product }],
    });
    if (!tagData) { // if no tag data is found
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    };
    res.status(200).json(tagData);
  } catch (error) { 
    res.status(500).json({ message: 'Something went wrong in tag-routes get:2', error: error.message });
  }
});


router.post('/', async(req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create(req.body); // create a new tag
    res.status(200).json(tagData);
  } catch (error) { 
    res.status(500).json({ message: 'Something went wrong in tag-routes post:1', error: error.message });
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = await Tag.update(req.body, { // update a tag's name
      where: { 
        id: req.params.id, // based on the tag's id
      },
    });
    res.status(200).json(tagData);
  } catch (error) { 
    res.status(500).json({ message: 'Something went wrong in tag-routes put:1', error: error.message });
  }
});

router.delete('/:id', async(req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({ // delete a tag
      where: { 
        id: req.params.id, // based on the tag's id
      },
    });
    if (!tagData) { // if no tag data is found
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    };
    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong in tag-routes delete:1', error: error.message });
  }
});

module.exports = router;