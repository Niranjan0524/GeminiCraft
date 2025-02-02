const Notification=({message})=>{
    return (
      <>
        <div class="toast-container p-3" id="toastPlacement">
          <div class="toast fade show">
            <div class="toast-header">
              <svg
                class="bd-placeholder-img rounded me-2"
                width="20"
                height="20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              >
                <rect width="100%" height="100%" fill="#007aff"></rect>
              </svg>
              <strong class="me-auto">Bootstrap</strong>
              <small>11 mins ago</small>
            </div>
            <div class="toast-body">{message}</div>
          </div>
        </div>
      </>
    );
};

export default Notification;