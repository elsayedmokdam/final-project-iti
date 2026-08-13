import { Link } from "react-router";
import { FaStar } from "react-icons/fa";
import formatPrice from "../../utilities/helpers/formatPrice";
import formatTitle from "../../utilities/helpers/formatTitle";
import AppButton from "../shared-components/appbutton/AppButton";
import { $Services } from "../../services/services-repository";
import { $Utilities } from "../../utilities/utilities-repository";
import { useState } from "react";

export default function ProductCard({ product }) {
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const hasDiscount =
    product.price > 0 &&
    product.priceAfterDiscount !== 0 &&
    product.priceAfterDiscount !== undefined &&
    product.priceAfterDiscount < product.price;

  const discountPercentage =
    hasDiscount && product.priceAfterDiscount
      ? Math.round(
          ((product.price - product.priceAfterDiscount) / product.price) * 100,
        )
      : 0;

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
    <div
      className="card h-100 border-0 overflow-hidden"
      style={{
        backgroundColor: "var(--surface)",
        borderRadius: "var(--radius-xl)",
        boxShadow: "var(--shadow-md)",
        transition: "all 0.3s ease",
      }}
    >
      <div
        className="position-relative overflow-hidden"
        style={{
          backgroundColor: "var(--surface-secondary)",
          borderRadius: "var(--radius-xl) var(--radius-xl) 0 0",
        }}
      >
        <Link
          to={`/products/${product.id}`}
          className="d-block text-decoration-none"
        >
          {hasDiscount && (
            <span
              className="position-absolute top-0 start-0 m-3 px-3 py-1 fw-semibold"
              style={{
                backgroundColor: "var(--discount)",
                color: "var(--text-white)",
                borderRadius: "var(--radius-full)",
                fontSize: "0.75rem",
                zIndex: 2,
              }}
            >
              -{discountPercentage}%
            </span>
          )}

          <div
            className="d-flex align-items-center justify-content-center"
            style={{
              height: "260px",
              padding: "1rem",
            }}
          >
            <img
              src={product.imageCover}
              alt={product.title}
              className="img-fluid"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                transition: "transform 0.3s ease",
              }}
            />
          </div>
        </Link>
      </div>

      <Link
        to={`/products/${product.id}`}
        className="text-decoration-none flex-grow-1"
      >
        <div className="card-body p-3 p-md-4 d-flex flex-column">
          <p
            className="small mb-1"
            style={{
              color: "var(--text-muted)",
            }}
          >
            {product.category?.name}
          </p>
          <h5
            className="fw-semibold mb-2"
            style={{
              color: "var(--foreground)",
              minHeight: "48px",
              lineHeight: "1.5",
            }}
          >
            {formatTitle(product.title, 30)}
          </h5>
          <div className="d-flex align-items-center gap-2 mb-3">
            <div className="d-flex gap-1">
              {Array.from({ length: 5 }, (_, index) => (
                <FaStar
                  key={index}
                  size={14}
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
              {product.ratingsAverage?.toFixed(1)} ({product.ratingsQuantity})
            </span>
          </div>
          <div className="d-flex align-items-center gap-2 mt-auto">
            {hasDiscount && (
              <span
                className="fw-bold fs-5"
                style={{
                  color: "var(--price)",
                }}
              >
                {formatPrice(product.priceAfterDiscount)} EGP
              </span>
            )}

            {hasDiscount && (
              <span className="small text-decoration-line-through text-danger">
                {formatPrice(product.price)} EGP
              </span>
            )}
          </div>
        </div>
      </Link>
      <div className="px-3 pb-3 px-md-4 pb-md-4">
        <AppButton
          type="button"
          variant="primary"
          className="w-100 rounded-4 border-0 shadow-sm p-2 fw-bold"
          style={{
            backgroundColor: "var(--primary)",
            color: "var(--text-white)",
          }}
          onClick={handleAddToCart}
        >
          Add To Cart
        </AppButton>
      </div>
    </div>
  );
}
