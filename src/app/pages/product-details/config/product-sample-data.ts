import { Product } from 'src/app/common/models/product.model';

export const PRODUCT_SAMPLE: Product = {
  id: 4579,
  name: 'Fall Limited Edition Sneakers',
  vendor: 'Sneaker Company',
  description: 'These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they\'ll withstand everything the weather can offer.',
  stockPrice: 250,
  currentPrice: 125,
  media: {
    images: [
      {
        thumbnail: 'assets/images/image-product-1-thumbnail.jpg',
        original: 'assets/images/image-product-1.jpg'
      },
      {
        thumbnail: 'assets/images/image-product-2-thumbnail.jpg',
        original: 'assets/images/image-product-2.jpg'
      },
      {
        thumbnail: 'assets/images/image-product-3-thumbnail.jpg',
        original: 'assets/images/image-product-3.jpg'
      },
      {
        thumbnail: 'assets/images/image-product-4-thumbnail.jpg',
        original: 'assets/images/image-product-4.jpg'
      },
    ]
  },
  discounted: true,
  stock: 260
}
