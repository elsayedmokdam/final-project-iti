import React from "react";
import { Link } from "react-router";
import formatPrice from "../../utilities/helpers/formatPrice.js";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa6";

export default function CartItem({
  item,
  product,
  isUpdating,
  updateQuantity,
  removeProduct,
  setLoadingProductId,
}) {
  const productId = product._id;
  return (
    <div
      key={item?._id}
      className="py-3"
      style={{
        borderBottom: "1px solid var(--border-light)",
      }}
    >
      <div className="row align-items-center g-3">
        <div className="col-4 col-sm-3 col-md-2">
          <Link to={`/products/${productId}`} className="d-block">
            <div
              className="rounded-3 overflow-hidden"
              style={{
                backgroundColor: "var(--surface-secondary)",
              }}
            >
              <img
                src={product.imageCover}
                alt={product.title}
                className="img-fluid w-100"
                style={{
                  aspectRatio: "1 / 1",
                  objectFit: "contain",
                }}
              />
            </div>
          </Link>
        </div>
        <div className="col-8 col-sm-9 col-md-5">
          <Link
            to={`/products/${productId}`}
            className="text-decoration-none"
            style={{
              color: "var(--foreground)",
            }}
          >
            <h5 className="fw-semibold mb-2">{product.title}</h5>
          </Link>

          <div className="d-flex flex-wrap gap-2 mb-2">
            <span
              className="badge rounded-pill"
              style={{
                backgroundColor: "var(--primary-light)",
                color: "var(--primary)",
              }}
            >
              {product.category?.name}
            </span>

            <span
              className="badge rounded-pill"
              style={{
                backgroundColor: "var(--surface-secondary)",
                color: "var(--text-secondary)",
              }}
            >
              {product.brand?.name}
            </span>
          </div>

          <div
            className="fw-bold"
            style={{
              color: "var(--price)",
            }}
          >
            {formatPrice(item.price)} EGP
          </div>
        </div>

        <div className="col-7 col-sm-6 col-md-3">
          <label
            className="small fw-semibold d-block mb-2"
            style={{
              color: "var(--text-muted)",
            }}
          >
            Quantity
          </label>

          <div
            className="d-flex align-items-center border rounded-3 overflow-hidden"
            style={{
              borderColor: "var(--border)",
              width: "fit-content",
            }}
          >
            <button
              type="button"
              disabled={isUpdating || item.count <= 1}
              onClick={() => updateQuantity(productId, item.count - 1)}
              className="btn border-0 rounded-0"
              style={{
                color: "var(--foreground)",
                backgroundColor: "var(--surface-secondary)",
              }}
            >
              <FaMinus size={11} />
            </button>

            <span
              className="px-3 fw-semibold"
              style={{
                minWidth: "45px",
                textAlign: "center",
              }}
            >
              {isUpdating ? (
                <span
                  className="spinner-border spinner-border-sm"
                  style={{
                    color: "var(--primary)",
                  }}
                />
              ) : (
                item.count
              )}
            </span>

            <button
              type="button"
              disabled={isUpdating || item.count >= product.quantity}
              onClick={() => updateQuantity(productId, item.count + 1)}
              className="btn border-0 rounded-0"
              style={{
                color: "var(--foreground)",
                backgroundColor: "var(--surface-secondary)",
              }}
            >
              <FaPlus size={11} />
            </button>
          </div>
        </div>

        <div className="col-5 col-sm-6 col-md-2 text-md-end">
          <div
            className="fw-bold mb-2"
            style={{
              color: "var(--foreground)",
            }}
          >
            {(item.price * item.count).toLocaleString()} EGP
          </div>

          <button
            type="button"
            disabled={isUpdating}
            onClick={() => removeProduct(productId)}
            className="btn btn-sm border-0 px-0"
            style={{
              color: "var(--danger)",
            }}
          >
            <FaTrash size={13} className="me-1" />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
