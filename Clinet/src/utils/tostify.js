class Toast {
  constructor() {
    this.toasts = [];
    this.toastContainer = document.createElement("div");
    this.toastContainer.className = "toast-container";
    document.body.appendChild(this.toastContainer);
  }

  createToast(type, message) {
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerHTML = `
            <div class="toast-icon">${this.getIcon(type)}</div>
            <div class="toast-message">${message}</div>
            <button class="toast-close">×</button>
        `;

    // Append the toast to the container
    this.toastContainer.appendChild(toast);
    this.toasts.push(toast);

    // Set a timeout to automatically remove the toast after 3 seconds
    setTimeout(() => {
      this.removeToast(toast);
    }, 7000);

    // Close button functionality
    toast.querySelector(".toast-close").onclick = () => {
      this.removeToast(toast);
    };
  }

  removeToast(toast) {
    this.toastContainer.removeChild(toast);
    this.toasts = this.toasts.filter((t) => t !== toast);
  }

  getIcon(type) {
    switch (type) {
      case "success":
        return "✔️"; // Success icon
      case "error":
        return "❌"; // Error icon
      case "warning":
        return "⚠️"; // Warning icon
      default:
        return "";
    }
  }
}

export default Toast;
// // Usage example
// const toastManager = new Toast();

// // To create a toast
// toastManager.createToast("success", "Item moved successfully.");
// toastManager.createToast("error", "Item has been deleted.");
// toastManager.createToast("warning", "Improve password difficulty.");
