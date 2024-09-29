```
backend/
┣ controllers/
┃ ┣ categoryController.js
┃ ┣ couponController.js
┃ ┣ deliveryBoyController.js
┃ ┣ messageController.js
┃ ┣ offerController.js
┃ ┣ orderController.js
┃ ┣ productController.js
┃ ┗ userController.js
┣ mailTemplates/
┃ ┣ contactTemplate.js
┃ ┗ orderTemplate.js
┣ middleware/
┃ ┣ adminAuth.js
┃ ┣ auth.js
┃ ┣ deliveryBoyAuth.js
┃ ┗ tokenRefresh.js
┣ models/
┃ ┣ Category.js
┃ ┣ Coupon.js
┃ ┣ DeliveryBoy.js
┃ ┣ Message.js
┃ ┣ Offer.js
┃ ┣ Order.js
┃ ┣ Product.js
┃ ┗ User.js
┣ routes/
┃ ┣ categoryRoutes.js
┃ ┣ couponRoutes.js
┃ ┣ deliveryBoyRoutes.js
┃ ┣ messageRoutes.js
┃ ┣ offerRoutes.js
┃ ┣ orderRoutes.js
┃ ┣ productRoutes.js
┃ ┗ userRoutes.js
┣ services/
┃ ┣ cloudinaryConfig.js
┃ ┗ emailConfig.js
┣ .env
┣ .gitignore
┣ app.js
┣ package-lock.json
┣ package.json
┣ README.md
┗ server.js
```
Products:

- [x] GET `/api/products` (Get all products)
- [x] GET `/api/products/:id` (Get a specific product)
- [ ] POST `/api/products` (Create a product)
- [ ] PUT `/api/products/:id` (Update a product)
- [ ] DELETE `/api/products/:id` (Delete a product) - gauri


Categories:

- [x] GET `/api/categories` (Get all categories)
- [ ] POST `/api/categories` (Create a category)
- [ ] DELETE `/api/categories/:id` (Delete a category) - gauri


Coupons:

- [ ] GET `/api/coupons` (Get all coupons)  - gauri
- [ ] GET `/api/coupons/:id` (Get a specific coupon)  
- [ ] POST `/api/coupons` (Create a coupon)
- [ ] PUT `/api/coupons/:id` (Update a coupon)
- [ ] DELETE `/api/coupons/:id` (Delete a coupon)  - gauri

Offers:

- [ ] GET `/api/offers` (Get all offers)  - gauri
- [ ] GET `/api/offers/:id` (Get a specific offer)  - gauri
- [ ] POST `/api/offers` (Create an offer)
- [ ] PUT `/api/offers/:id` (Update an offer)
- [ ] DELETE `/api/offers/:id` (Delete an offer)  - gauri

User Management:

- [x] POST `/api/users/register` (Register a new user)
- [x] POST `/api/users/login` (User login)
- [x] GET `/api/users/profile` (Get user profile)
- [x] PUT `/api/users/profile` (Update user profile)
- [ ] POST `/api/users/address` (Add a new address)
- [ ] DELETE `/api/users/address/:addressId` (Delete an address)
- [ ] GET `/api/users/orders` (Get user's order history)  - gauri


Admin User Management:

- [ ] PUT `/api/users/change-role` (Change user role)
- [ ] POST `/api/users/add-user` (Add a new user)
- [ ] GET `/api/users/list` (List all users)  - gauri
- [ ] POST `/api/users/create-delivery-boy` (Create a new delivery boy)

Delivery boy:

- [ ] POST `/api/delivery/login` (Delivery boy login)
- [ ] GET `/api/delivery/packed-orders` (Get all packed orders)  - gauri
- [ ] POST `/api/delivery/accept-order/:orderId` (Accept an order)
- [ ] GET `/api/delivery/accepted-orders` (Get all accepted orders)  - gauri
- [ ] PUT `/api/delivery/update-order-status/:orderId` (Update order status to delivered)

Order Management:

- [ ] POST `/api/orders` (Create a new order)
- [ ] GET `/api/orders/:id` (Get a specific order)  - gauri
- [ ] GET `/api/orders` (Get all orders - admin only)  - gauri
- [ ] PUT `/api/orders/:id/status` (Update order status)
- [ ] PUT `/api/orders/:id/assign-delivery` (Assign a delivery boy to an order)




