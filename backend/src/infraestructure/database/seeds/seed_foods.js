exports.seed = async function (knex) {
  return knex('foods')
    .del()
    .then(function () {
      return knex('foods').insert([
        {
          id: '06448797-1484-4640-b3ae-67c7938a5517',
          food_name: 'Leche Bodega Aurrera',
          image:
            'https://i5.walmartimages.com.mx/gr/images/product-images/img_large/00750179160090L.jpg',
          category: 'Lácteos',
          expiration_date: '2023-12-31',
          quantity: 25,
          status: 'Disponible',
        },
        {
          id: '8ba03057-4c37-436a-964c-51e528c4c8ea',
          food_name: 'Cereal Choco Krispis',
          image:
            'https://chefmart.com.mx/cdn/shop/files/chocokrispis540G_1200x.png?v=1722545560',
          category: 'Cereales',
          expiration_date: '2023-12-31',
          quantity: 35,
          status: 'Disponible',
        },
        {
          id: '2cea66c3-daf4-49d2-89b8-c6851365c7f6',
          food_name: 'Plátano Tabasco',
          image:
            'https://i5.walmartimages.com.mx/gr/images/product-images/img_large/00000000004011L2.jpg?odnHeight=612&odnWidth=612&odnBg=FFFFFF',
          category: 'Frutas',
          expiration_date: '2023-12-31',
          quantity: 25,
          status: 'Disponible',
        },
        {
          id: 'c49e30bd-5489-4070-ab39-48c0ab4a84b0',
          food_name: 'Zanahorias Orgánicas',
          image:
            'https://i5.walmartimages.com.mx/gr/images/product-images/img_large/00750301955495L1.jpg?odnHeight=612&odnWidth=612&odnBg=FFFFFF',
          category: 'Verduras',
          expiration_date: '2023-12-31',
          quantity: 35,
          status: 'Disponible',
        },
        {
          id: '95f3d4b8-e1da-49d4-9c28-396e8f5b7772',
          food_name: 'Manzanas Gala',
          image:
            'https://i5.walmartimages.com.mx/gr/images/product-images/img_large/00000000004203L1.jpg?odnHeight=612&odnWidth=612&odnBg=FFFFFF',
          category: 'Frutas',
          expiration_date: '2023-12-31',
          quantity: 0,
          status: 'Agotado',
        },
        {
          id: 'e93a0100-b38e-4dc2-a555-d6f75725eb07',
          food_name: 'Leche Condensada Carnation',
          image:
            'https://i5.walmartimages.com.mx/gr/images/product-images/img_large/00750649501394L.jpg',
          category: 'Cereales',
          expiration_date: '2023-12-31',
          quantity: 0,
          status: 'Descontinuado',
        },
      ]);
    });
};
