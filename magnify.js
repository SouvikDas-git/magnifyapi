function magnify(imgID, zoom, mgsize) {
    var img, glass, w, h;
    img = document.getElementById(imgID);

    /* Create magnifier glass: */
    glass = document.createElement("DIV");

    // glass.setAttribute("class", "img-magnifier-glass");

    /* Insert magnifier glass: */
    img.parentElement.insertBefore(glass, img);
    img.style.cursor = "none";
    // img.parentElement.style.overflow = "hidden";

    glass.style.position = "absolute";


    glass.style.height = mgsize + "px";
    glass.style.width = mgsize + "px";

    /* Set background properties for the magnifier glass: */
    glass.style.backgroundImage = "url('" + img.src + "')";
    glass.style.backgroundRepeat = "no-repeat";
    glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";

    glass.style.borderRadius = "50%";
    glass.style.boxShadow = " 0px 0px 15px 2px rgba(0, 0, 0, 0.73)";
    glass.style.webkitBoxShadow = " 0px 0px 15px 2px rgba(0, 0, 0, 0.73)";
    glass.style.mozBoxShadow = " 0px 0px 15px 2px rgba(0, 0, 0, 0.73)";
    glass.style.pointerEvents = "none";

    w = glass.offsetWidth / 2;
    h = glass.offsetHeight / 2;


    /* Execute a function when someone moves the magnifier glass over the image: */
    glass.addEventListener("mousemove", moveMagnifier);
    img.addEventListener("mousemove", moveMagnifier);


    /*and also for touch screens:*/
    glass.addEventListener("touchmove", moveMagnifier);
    img.addEventListener("touchmove", moveMagnifier);

    function moveMagnifier(event) {
        var pos, x, y;
        /* Prevent any other actions that may occur when moving over the image */
        event.preventDefault();
        /* Get the cursor's x and y positions: */
        pos = getCursorPos(event);
        x = pos.x;
        y = pos.y;
        /* Prevent the magnifier glass from being positioned outside the image: */
        if (x > img.width - (w / zoom)) { x = img.width - (w / zoom); }
        if (x < w / zoom) { x = w / zoom; }
        if (y > img.height - (h / zoom)) { y = img.height - (h / zoom); }
        if (y < h / zoom) { y = h / zoom; }
        /* Set the position of the magnifier glass: */
        glass.style.left = (x - w) + "px";
        glass.style.top = (y - h) + "px";
        /* Display what the magnifier glass "sees": */
        glass.style.backgroundPosition = "-" + ((x * zoom) - w) + "px -" + ((y * zoom) - h) + "px";
    }

    function getCursorPos(event) {
        const x = event.offsetX;
        const y = event.offsetY;;
        return { x: x, y: y };
    }
}