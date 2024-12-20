<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\ColorController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\WishlistController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;







Route::prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('signin', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout'])->middleware('check.token');
    Route::get('checkauth', [AuthController::class, 'checkauth'])->middleware('check.token');
});

Route::prefix('products')->group(function () {
    Route::post('/', [ProductController::class, 'addProduct']);
    Route::get('/', [ProductController::class, 'getProducts']);
    Route::get('/categories', [ProductController::class, 'getCategories']);
    Route::post('/categories', [ProductController::class, 'addCategory']);
    Route::get('/brands', [ProductController::class, 'getBrands']);
    Route::post('/brands', [ProductController::class, 'addBrand']);
    Route::get('/colors', [ProductController::class, 'getColors']);
    Route::get('/{slug}', [ProductController::class, 'getProductBySlug']);
    Route::put('/{id}', [ProductController::class, 'updateProduct']);
    Route::delete('/{id}', [ProductController::class, 'deleteProduct']);
    
});

Route::prefix('wishlist')->group(function () {
    Route::post('/', [WishlistController::class, 'addProductToWishlist'])->middleware('check.token');
    Route::get('/', [WishlistController::class, 'getWishlist'])->middleware('check.token');
    Route::delete('/{id}', [WishlistController::class, 'removeProductFromWishlist'])->middleware('check.token');
});

Route::prefix('review')->group(function () {
    Route::post('/', [ReviewController::class, 'addReview'])->middleware('check.token');
    Route::put('/{reviewId}', [ReviewController::class, 'updateReview'])->middleware('check.token');
    Route::delete('/{reviewId}', [ReviewController::class, 'deleteReview'])->middleware('check.token');
    Route::get('/{slug}', [ReviewController::class, 'getProductReviews'])->middleware('check.token');
});

Route::prefix('cart')->group(function () {
    Route::post('/', [CartController::class, 'addToCart'])->middleware('check.token');
    Route::get('/', [CartController::class, 'getCart'])->middleware('check.token');
    Route::put('/', [CartController::class, 'removeFromCart'])->middleware('check.token');
    Route::delete('/clear', [CartController::class, 'clearCart'])->middleware('check.token');
    Route::put('/updateQuantity', [CartController::class, 'updateCartItemQuantity'])->middleware('check.token');
});


Route::prefix('colors')->group(function () {
    Route::get('/', [ColorController::class, 'getProductsColor'])->middleware('check.token');
    Route::get('/{slug}', [ColorController::class, 'getProductColors'])->middleware('check.token');
});

Route::prefix('orders')->group(function () {
    Route::post('/cashorder', [OrderController::class, 'createCashOrder'])->middleware('check.token');
    Route::post('/checkoutSesseion', [OrderController::class, 'createCheckoutSession'])->middleware('check.token'); 
    Route::get('/', [OrderController::class, 'getAllOrders'])->middleware('check.token'); 
    Route::delete('/{id}', [OrderController::class, 'deleteOrder'])->middleware('check.token'); 
    Route::get('/{id}', [OrderController::class, 'getOrderDetails'])->middleware('check.token'); 
    Route::put('/{id}', [OrderController::class, 'updateOrder'])->middleware('check.token'); 
});
