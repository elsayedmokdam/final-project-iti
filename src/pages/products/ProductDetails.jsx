import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import {
  FaArrowLeft,
  FaCartShopping,
  FaHeart,
  FaRegHeart,
  FaStar,
  FaTruckFast,
  FaShieldHalved,
  FaBoxOpen,
  FaMinus,
  FaPlus,
} from "react-icons/fa6";

import { $Services } from "../../services/services-repository";
import { $Utilities } from "../../utilities/utilities-repository";
import AppButton from "../../components/shared-components/appbutton/AppButton";
import formatPrice from "../../utilities/helpers/formatPrice";

export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setIsLoading(true);
        const response =
          await $Services.PRODUCTS_REPOSITORY.getSpecificProduct(id);
        const productData = response?.data?.data || response?.data || response;
        setProduct(productData);
        if (productData?.imageCover) {
          setSelectedImage(productData.imageCover);
        }
      } catch (error) {
        console.error(error);
        $Utilities.Alerts.displayError(error);
      } finally {
        setIsLoading(false);
      }
    }

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const images = [product?.imageCover, ...(product?.images || [])];
  const price = Number(product?.price) || 0;

  const isOutOfStock = !product?.quantity || product?.quantity <= 0;

  const increaseQuantity = () => {
    if (quantity < product.quantity) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  async function handleAddToCart() {
    try {
      setIsAddingToCart(true);
      await $Services.CART_REPOSITORY.addToCart(product._id);
      $Utilities.Alerts.displaySuccess("Product added to cart successfully!");
    } catch (error) {
      console.error(error);
      $Utilities.Alerts.displayError(error);
      console.log(error);
    } finally {
      setIsAddingToCart(false);
    }
  }

  return (
    <>
      {isLoading ? (
        <main
          className="min-vh-100 py-5"
          style={{
            backgroundColor: "var(--background)",
            color: "var(--foreground)",
          }}
        >
          <div className="container">
            <div className="placeholder-glow mb-4">
              <span
                className="placeholder col-2 rounded"
                style={{ height: "20px" }}
              />
            </div>

            <div className="row g-4 g-lg-5">
              {/* Images Skeleton */}
              <div className="col-12 col-lg-6">
                <div
                  className="placeholder-glow rounded-4 overflow-hidden"
                  style={{
                    height: "500px",
                    backgroundColor: "var(--surface-secondary)",
                  }}
                >
                  <span className="placeholder w-100 h-100" />
                </div>

                <div className="d-flex gap-3 mt-3">
                  {[1, 2, 3, 4].map((item) => (
                    <div
                      key={item}
                      className="placeholder-glow"
                      style={{
                        width: "80px",
                        height: "80px",
                      }}
                    >
                      <span className="placeholder w-100 h-100 rounded-3" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Info Skeleton */}
              <div className="col-12 col-lg-6">
                <div className="placeholder-glow mb-3">
                  <span className="placeholder col-3" />
                </div>

                <div className="placeholder-glow mb-3">
                  <span className="placeholder col-10" />
                </div>

                <div className="placeholder-glow mb-4">
                  <span className="placeholder col-5" />
                </div>

                <div className="placeholder-glow mb-4">
                  <span className="placeholder col-4" />
                </div>

                <div className="placeholder-glow">
                  <span
                    className="placeholder col-12"
                    style={{ height: "120px" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      ) : (
        <main
          className="min-vh-100 py-4 py-md-5"
          style={{
            backgroundColor: "var(--background)",
            color: "var(--foreground)",
          }}
        >
          <div className="container">
            <div className="mb-4">
              <Link
                to="/products"
                className="text-decoration-none d-inline-flex align-items-center gap-2 fw-semibold"
                style={{
                  color: "var(--text-secondary)",
                }}
              >
                <FaArrowLeft size={14} />
                Back to Products
              </Link>
            </div>
            <div className="row g-4 g-lg-5">
              <div className="col-12 col-lg-6">
                <div
                  className="card border-0 overflow-hidden"
                  style={{
                    backgroundColor: "var(--surface)",
                    borderRadius: "var(--radius-xl)",
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  <div
                    className="position-relative d-flex align-items-center justify-content-center p-3 p-md-5"
                    style={{
                      minHeight: "400px",
                      height: "clamp(400px, 50vw, 560px)",
                      backgroundColor: "var(--surface)",
                    }}
                  >
                    <img
                      src={selectedImage}
                      alt={product.title}
                      className="img-fluid w-100 h-100"
                      style={{
                        objectFit: "contain",
                        maxHeight: "500px",
                      }}
                    />
                    <div
                      className="position-absolute top-0 start-0 m-3 px-3 py-2 rounded-pill fw-semibold small"
                      style={{
                        backgroundColor: isOutOfStock
                          ? "var(--danger-light)"
                          : "var(--success-light)",
                        color: isOutOfStock
                          ? "var(--danger)"
                          : "var(--success-dark)",
                      }}
                    >
                      {isOutOfStock
                        ? "Out of Stock"
                        : `${product.quantity} in stock`}
                    </div>
                  </div>
                </div>
                {images.length > 1 && (
                  <div className="d-flex gap-2 gap-md-3 mt-3 overflow-auto pb-2">
                    {images.map((image, index) => (
                      <button
                        type="button"
                        key={`${image}-${index}`}
                        onClick={() => setSelectedImage(image)}
                        className="border-0 p-0 flex-shrink-0 rounded-3 overflow-hidden"
                        style={{
                          width: "clamp(65px, 15vw, 90px)",
                          height: "clamp(65px, 15vw, 90px)",
                          backgroundColor: "var(--surface)",
                          border:
                            selectedImage === image
                              ? "2px solid var(--primary)"
                              : "2px solid var(--border)",
                          borderRadius: "var(--radius-md)",
                        }}
                      >
                        <img
                          src={image}
                          alt={`${product.title} ${index + 1}`}
                          className="w-100 h-100"
                          style={{
                            objectFit: "contain",
                          }}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="col-12 col-lg-6">
                <div className="h-100 d-flex flex-column">
                  <div className="d-flex flex-wrap gap-2 mb-3">
                    <span
                      className="badge rounded-pill px-3 py-2"
                      style={{
                        backgroundColor: "var(--primary-light)",
                        color: "var(--primary)",
                      }}
                    >
                      {product.category?.name}
                    </span>
                    {product.brand?.name && (
                      <span
                        className="badge rounded-pill px-3 py-2"
                        style={{
                          backgroundColor: "var(--surface-secondary)",
                          color: "var(--text-secondary)",
                        }}
                      >
                        {product.brand.name}
                      </span>
                    )}
                  </div>
                  <h1 className="display-6 fw-bold mb-3">{product.title}</h1>
                  <div className="d-flex align-items-center gap-2 mb-4">
                    <div className="d-flex gap-1">
                      {Array.from({ length: 5 }, (_, index) => (
                        <FaStar
                          key={index}
                          size={16}
                          style={{
                            color:
                              index < Math.round(product.ratingsAverage)
                                ? "var(--rating)"
                                : "var(--border)",
                          }}
                        />
                      ))}
                    </div>
                    <span
                      className="small"
                      style={{
                        color: "var(--text-secondary)",
                      }}
                    >
                      {product.ratingsAverage?.toFixed(1) || "0.0"} (
                      {product.ratingsQuantity || 0} reviews)
                    </span>
                  </div>
                  <div
                    className="d-flex align-items-center gap-3 mb-4 pb-4"
                    style={{
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    <span
                      className="display-6 fw-bold"
                      style={{
                        color: "var(--price)",
                      }}
                    >
                      {formatPrice(product.price)} EGP
                    </span>
                  </div>
                  <div className="mb-4">
                    <h2 className="h5 fw-bold mb-2">Description</h2>
                    <p
                      className="mb-0 lh-lg"
                      style={{
                        color: "var(--text-secondary)",
                        whiteSpace: "pre-line",
                      }}
                    >
                      {product.description}
                    </p>
                  </div>
                  {!isOutOfStock && (
                    <div className="mb-4">
                      <label className="form-label fw-semibold">Quantity</label>
                      <div className="d-flex align-items-center gap-3">
                        <div
                          className="d-flex align-items-center border rounded-pill overflow-hidden"
                          style={{
                            borderColor: "var(--border)",
                          }}
                        >
                          <button
                            type="button"
                            onClick={decreaseQuantity}
                            className="btn border-0 rounded-0 px-3 py-2"
                            style={{
                              color: "var(--foreground)",
                            }}
                          >
                            <FaMinus size={12} />
                          </button>
                          <span
                            className="fw-bold px-3"
                            style={{
                              minWidth: "45px",
                              textAlign: "center",
                            }}
                          >
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={increaseQuantity}
                            disabled={quantity >= product.quantity}
                            className="btn border-0 rounded-0 px-3 py-2"
                            style={{
                              color: "var(--foreground)",
                            }}
                          >
                            <FaPlus size={12} />
                          </button>
                        </div>
                        <small
                          style={{
                            color: "var(--text-muted)",
                          }}
                        >
                          {product.quantity} available
                        </small>
                      </div>
                    </div>
                  )}
                  <AppButton
                    type="submit"
                    color="primary"
                    size="lg"
                    className="w-100 text-light border-0 rounded-4 p-2"
                    disabled={isOutOfStock}
                    onClick={handleAddToCart}
                  >
                    {isOutOfStock ? "Out of stock" : "Add to cart"}
                  </AppButton>
                  <div
                    className="row g-2 mt-auto pt-3"
                    style={{
                      borderTop: "1px solid var(--border)",
                    }}
                  >
                    <div className="col-12 col-sm-4">
                      <div className="d-flex align-items-center gap-2">
                        <div
                          className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                          style={{
                            width: "40px",
                            height: "40px",
                            backgroundColor: "var(--success-light)",
                            color: "var(--success)",
                          }}
                        >
                          <FaTruckFast size={16} />
                        </div>
                        <div>
                          <small className="fw-bold d-block">
                            Fast Delivery
                          </small>
                          <small
                            style={{
                              color: "var(--text-muted)",
                            }}
                          >
                            Quick shipping
                          </small>
                        </div>
                      </div>
                    </div>

                    <div className="col-12 col-sm-4">
                      <div className="d-flex align-items-center gap-2">
                        <div
                          className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                          style={{
                            width: "40px",
                            height: "40px",
                            backgroundColor: "var(--primary-light)",
                            color: "var(--primary)",
                          }}
                        >
                          <FaShieldHalved size={16} />
                        </div>
                        <div>
                          <small className="fw-bold d-block">
                            Secure Payment
                          </small>
                          <small
                            style={{
                              color: "var(--text-muted)",
                            }}
                          >
                            100% secure
                          </small>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="d-flex align-items-center gap-2">
                        <div
                          className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                          style={{
                            width: "40px",
                            height: "40px",
                            backgroundColor: "var(--warning-light)",
                            color: "var(--warning)",
                          }}
                        >
                          <FaBoxOpen size={16} />
                        </div>
                        <div>
                          <small className="fw-bold d-block">
                            {product.sold || 0}+ Sold
                          </small>
                          <small
                            style={{
                              color: "var(--text-muted)",
                            }}
                          >
                            Popular product
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
}
