const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async(req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  try {
    const productData = await Product.findAll({
      include: [{ model: Category }, { model: Tag }],
    });
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
    console.log(err, 'error in product-routes.js get all products');
  }
});

// get one product
router.get('/:id', async(req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  try { 
    const productData = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag }],
    });
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
    console.log(err, 'error in product-routes.js get one product by id');
  }

});

// create new product
router.post('/', (req, res) => {

  Product.create(req.body) // req.body is an object that looks like this: {product_name: "Basketball", price: 200.00, stock: 3, tagIds: [1, 2, 3, 4]}
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) { // if there are tagIds in the req.body object
        const productTagIdArr = req.body.tagIds.map((tag_id) => { // map over the array of tagIds
          return { 
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr); // bulk create the array of productTagIds
      }
      // if no product tags, just respond
      res.status(200).json(product); // if there are no tagIds in the req.body object, just respond with the product object
    })
    .then((productTagIds) => res.status(200).json(productTagIds)) // if there are tagIds in the req.body object, respond with the productTagIds
    .catch((err) => { 
      console.log(err);
      res.status(400).json(err);
    });

});

// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', async(req, res) => {
  // delete one product by its `id` value
  try {
    const productData = await Product.destroy({ // delete the product
      where: { id: req.params.id },
    });
    if (!productData) { // if there is no product with that id
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }
    res.status(200).json(productData);
  }
  catch (err) {
    res.status(500).json(err);
    console.log(err, 'error in product-routes.js delete one product by id');
  }

});

module.exports = router;
