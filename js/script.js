$(document).ready(() => {
    //global variable
    let score = 0;
    let mistake = 0;
    let totalDraggables = $('.dragElement').length; // Count all draggable elements
    let bathroomTimer;
    let bedroomTimer;
    let kitchenTimer;
    let livingroomTimer;
    let bathroomCounter;
    let bedroomCounter;
    let kitchenCounter;
    let livingroomCounter;
    startBathroomTimer();
    startBedroomTimer();
    startKitchenTimer();
    startLivingroomTimer();

    //Submit name
    const nameSub = $("nameSub");
    nameSub.on("click", function () {

    })

    const $fadedElements = $(".fadedElements");
    const shuffledElements = $fadedElements.toArray().sort(() => Math.random() - 0.5);  // Shuffle the faded elements

    // Clear existing elements in the drop zone
    $("#dropZone").empty();

    // Append shuffled elements to the drop zone and apply random rotation
    shuffledElements.forEach(element => {
        const randomRotation = Math.random() * 360; // Random rotation between 0 and 360 degrees
        $(element).css({
            transform: `rotate(${randomRotation}deg)` // Apply rotation
        });
        $("#dropZone").append(element);
    });

    // audio on/off
    const gameaudio = $("#gameaudio")[0];
    const btn = $("#audioBtn");
    const icon = $("#audioBtn > i");
    const audio = $("audio")[0];

    btn.on("click", function () {

        if (audio.paused) {
            console.log("Playing audio");
            audio.volume = 0.3;
            audio.play().then(() => {
                icon.removeClass('fa-volume-up');
                icon.addClass('fa-volume-mute');
            }).catch(error => {
                console.error("Error playing audio:", error);
            });
        } else {
            console.log("Pausing audio");
            audio.pause();
            icon.removeClass('fa-volume-mute');
            icon.addClass('fa-volume-up');
        }
    }); //end background audio


    //draggables start here
    $(".dragElement").draggable({
        revert: "invalid",
        start: function (event, ui) {
            ui.helper.css('transform', 'rotate(5deg) scale(1.5)');
        },
        stop: function (event, ui) {
            ui.helper.css('transform', 'rotate(0deg) scale(1)');
        },
        zIndex: 100
    });

    //Map draggable items to their corresponding images
    const itemImages = {
        "bath": "images/bathroom/bath.png",
        "brush": "images/bathroom/brush.png",
        "duck": "images/bathroom/duck.png",
        "mirror": "images/bathroom/mirror.png",
        "oneTowel": "images/bathroom/oneTowel.png",
        "robe": "images/bathroom/robe.png",
        "shampoo": "images/bathroom/shampoo.png",
        "shower": "images/bathroom/shower.png",
        "sink": "images/bathroom/sink.png",
        "soap": "images/bathroom/soap.png",
        "toilet": "images/bathroom/toilet.png",
        "toiletRoll": "images/bathroom/toiletRoll.png",
        "toothbrush": "images/bathroom/toothbrush.png",
        "toothpaste": "images/bathroom/toothpaste.png",
        "towels": "images/bathroom/towels.png",
        "abcBlocks": "images/bedroom/abcBlocks.png",
        "ball": "images/bedroom/ball.png",
        "bear": "images/bedroom/bear.png",
        "bed": "images/bedroom/bed.png",
        "blocks": "images/bedroom/blocks.png",
        "car": "images/bedroom/car.png",
        "dinosaur": "images/bedroom/dinosaur.png",
        "doll": "images/bedroom/doll.png",
        "giraffe": "images/bedroom/giraffe.png",
        "pillow": "images/bedroom/pillow.png",
        "plane": "images/bedroom/plane.png",
        "robot": "images/bedroom/robot.png",
        "rocket": "images/bedroom/rocket.png",
        "spining": "images/bedroom/spring.png",
        "train": "images/bedroom/train.png",
        "apron": "images/kitchen/apron.png",
        "bowl": "images/kitchen/bowl.png",
        "chopping": "images/kitchen/chopping.png",
        "cup": "images/kitchen/cup.png",
        "dishes": "images/kitchen/dishWashing.png",
        "glass": "images/kitchen/glass.png",
        "gloves": "images/kitchen/gloves.png",
        "grater": "images/kitchen/grater.png",
        "hanging": "images/kitchen/hangingAccessories.png",
        "knife": "images/kitchen/knife.png",
        "mixer": "images/kitchen/mixer.png",
        "pan": "images/kitchen/pan.png",
        "peeler": "images/kitchen/peeler.png",
        "toster": "images/kitchen/toster.png",
        "whisk": "images/kitchen/whisk.png",
        "books": "images/livingroom/books.png",
        "bookShelf": "images/livingroom/bookShelf.png",
        "chair": "images/livingroom/chair.png",
        "lamp": "images/livingroom/lamp.png",
        "paint": "images/livingroom/paint.png",
        "photo": "images/livingroom/photo.png",
        "pillowLiv": "images/livingroom/pillows.png",
        "plant": "images/livingroom/plant.png",
        "shelf": "images/livingroom/shelf.png",
        "smallShelf": "images/livingroom/smallShelf.png",
        "blanket": "images/livingroom/blanket.png",
        "sofa": "images/livingroom/sofa.png",
        "table": "images/livingroom/table.png",
        "tvLiv": "images/livingroom/tv.png",
        "vase": "images/livingroom/vase.png"
    };

    $(".droppableFaded").droppable({
        // Restrict to specific items and match the draggable items id
        accept: function (draggable) {
            const draggedId = draggable.attr('id');
            const droppableId = $(this).attr('id'); // The ID of the droppable area

            // Only allow drop if the draggable item matches the item for this droppable area
            return itemImages[draggedId] && droppableId.includes(draggedId); // Ensures only the correct item is dropped here
        },
        greedy: true, // Prevent event bubbling
        activeClass: "highlight", // Highlight the droppable area when the draggable is over it    
        over: handleOverEvent,
        out: handleOutEvent,
        drop: handleDropEvent    
    }); //END OF DROPPABLE

function handleOverEvent (event, ui) {
        $(this).addClass("highlight");

        //Hide character when hovering over
               $("#happyG").css("visibility", "hidden");     
               $("#sadG").css("visibility", "hidden");
    }; // end of over event
    function handleOutEvent (event, ui) {
        $(this).removeClass("highlight");

        // Hide character when the element leaves the droppable area
        $("#happyG").css("visibility", "hidden");     
        $("#sadG").css("visibility", "hidden");
    }; // end of out event
   function handleDropEvent (event, ui) {
        const droppedId = ui.draggable.attr("id"); // Get the ID of the dropped element
        const droppableId = $(this).attr("id");
        score ++;

        console.log(`Dropped ID: ${droppedId}, Droppable ID: ${droppableId}`); // Debugging log
        console.log("Dropped inside the zone. Points " + score);

        if (itemImages[droppedId] && droppableId.includes(droppedId)) {
            $(this).attr("src", itemImages[droppedId]); // Set the image source based on the dropped item

            ui.draggable.css("visibility", "hidden"); // Hide the original draggable element to avoid duplication

            $("#happyG").css("visibility", "visible").fadeIn(300).delay(300).fadeOut(300);

        } else {
            
            $("#sadG").css("visibility", "visible").fadeIn(300).delay(300).fadeOut(300);
        }

        if (score === totalDraggables) {
            // All draggables are dropped, open a new window
            window.location.href = 'index.html'; // Replace with your URL
        }

        $(this).removeClass("highlight"); // Remove the highlight when drop is done

    } // end of drop event fir correct matching


    $(".dropZone").droppable({
        // Restrict to specific items and match the draggable items id
        accept: "[data-type='dragElement']",
        drop: function (event, ui) {
            const $draggable = $(ui.draggable);

            // Check if the drop happened directly in `.game-area`, not in `.drop-zone`
            const isInDropZone =
              $draggable.hasClass("ui-draggable-dragging") &&
              $(".dropZone").has(ui.helper).length;
              if (!isInDropZone) {
             mistake++;
            console.log("Dropped outside the zone. Mistakes: " + mistake);               
              }

            ui.draggable.css("visibility", "visible"); // Hide the original draggable element to avoid duplication
            
            if (mistake === 1) {
                $("#sadG").css("visibility", "visible").fadeIn(300).delay(300).fadeOut(300);
                $("#heart3").css("visibility", "hidden").fadeOut(300);
            }
            else if (mistake === 2) {
                $("#sadG").css("visibility", "visible").fadeIn(300).delay(300).fadeOut(300);
                $("#heart2").css("visibility", "hidden").fadeOut(300);
            } else {
                $("#sadG").css("visibility", "visible").fadeIn(300).delay(300).fadeOut(300);
                $("#heart1").css("visibility", "hidden").fadeOut(300);
                $("#gameOverP").css("visibility", "visible").fadeIn(1500).delay(500);
                $("#gameOver").css("visibility", "visible").fadeIn(1500).delay(500);
                //Gary - this doesn't fadeIn it just display without fadding in...
                //Gary - this doesn't fadeIn it just display without fadding in...
                //Gary - this doesn't fadeIn it just display without fadding in...
                //Gary - this doesn't fadeIn it just display without fadding in...
                //Gary - this doesn't fadeIn it just display without fadding in...
                //Gary - this doesn't fadeIn it just display without fadding in...
                //Gary - this doesn't fadeIn it just display without fadding in...
                //Gary - this doesn't fadeIn it just display without fadding in...
                
let gameOver = $("#gameOver").on("click", function () {
    location.reload(true);
}); //end of gameOver function

            }
        }
    }); // end of mistake counting


    // bathroom game
    $("#openStartBathroom").on("click", startBathroom);

    $("#startBathroomButton").on("click", function () {
        startBathroomGame();
        startBathroomTimer();
    });

    //function to show play button when the bathroom img is pressed
    function startBathroom() {
        $("body").fadeOut(500, function () {
            $("#startBathroomOverlay").css("visibility", "visible");
            $("body").fadeIn(500);
        });
    }; //end of startBathroom function

    //function to change the location when the startBathroomButton is pressed to bathroom.html - fading out
    function startBathroomGame() {
        $("body").fadeOut(500, function () {
            window.location.href = 'bathroom.html';
        });
    }; // end of startBathroomGame

    //Function timer
    function startBathroomTimer() {
        bathroomCounter = 70;
        bathroomTimer = setInterval(function () {
            bathroomCounter--;
            if (bathroomCounter >= 0) {
                let countdown = document.getElementById("bathroomTimer");
                countdown.innerHTML = " " + bathroomCounter;
            } else {
                clearInterval(bathroomTimer); // Stop the timer when it reaches zero
            }
        }, 1000)
    }; //end of bathroom game

 

    // bedroom game
    $("#openStartBedroom").on("click", startBedroom);

    $("#startBedroomButton").on("click", function () {
        startBedroomGame();
        startBedroomTimer();
    });

    //function to show play button when the bedroom img is pressed
    function startBedroom() {
        $("body").fadeOut(500, function () {
            $("#startBedroomOverlay").css("visibility", "visible");
            $("body").fadeIn(500);
        });
    }; //end of startBedroom function

    //function to change the location when the startBedroomButton is pressed to bedroom.html - fading out
    function startBedroomGame() {
        $("body").fadeOut(500, function () {
            window.location.href = 'bedroom.html';
        });
    }; // end of startBedroomGame

    //Function timer
    function startBedroomTimer() {
        bedroomCounter = 65;
        bedroomTimer = setInterval(function () {
            bedroomCounter--;
            if (bedroomCounter >= 0) {
                let countdown = document.getElementById("bedroomTimer");
                countdown.innerHTML = " " + bedroomCounter;
            } else {
                console.error("Element with ID 'bedroomTimer' not found.");
                clearInterval(bedroomTimer); // Stop the timer when it reaches zero
            }
        }, 1000)
    }; //end of bedroom game



    // kitchen game
    $("#openStartKitchen").on("click", startKitchen);

    $("#startKitchenButton").on("click", function () {
        startKitchenGame();
        startKitchenTimer();
    });

    //function to show play button when the Kitchen img is pressed
    function startKitchen() {
        $("body").fadeOut(500, function () {
            $("#startKitchenOverlay").css("visibility", "visible");
            $("body").fadeIn(500);
        });
    }; //end of startKitchen function

    //function to change the location when the startKitchenButton is pressed to Kitchen.html - fading out
    function startKitchenGame() {
        $("body").fadeOut(500, function () {
            window.location.href = 'kitchen.html';
        });
    }; // end of startKitchenGame

    //Function timer
    function startKitchenTimer() {
        kitchenCounter = 50;
        kitchenTimer = setInterval(function () {
            kitchenCounter--;
            if (kitchenCounter >= 0) {
                let countdown = document.getElementById("kitchenTimer");
                countdown.innerHTML = " " + kitchenCounter;
            } else {
                clearInterval(kitchenTimer); // Stop the timer when it reaches zero
            }
        }, 1000)
    }; //end of kitchen game



    // Livingroom game
    $("#openStartLivingroom").on("click", startLivingroom);

    $("#startLivingroomButton").on("click", function () {
        startLivingroomGame();
        startLivingroomTimer();
    });

    //function to show play button when the Livingroom img is pressed
    function startLivingroom() {
        $("body").fadeOut(500, function () {
            $("#startLivingroomOverlay").css("visibility", "visible");
            $("body").fadeIn(500);
        });
    }; //end of startLivingroom function

    //function to change the location when the startLivingroomButton is pressed to livingroom.html - fading out
    function startLivingroomGame() {
        $("body").fadeOut(500, function () {
            window.location.href = 'livingroom.html';
        });
    }; // end of startLivingroomGame

    //Function timer
    function startLivingroomTimer() {
        livingroomCounter = 40;
        livingroomTimer = setInterval(function () {
            livingroomCounter--;
            if (livingroomCounter >= 0) {
                let countdown = document.getElementById("livingroomTimer");
                countdown.innerHTML = " " + livingroomCounter;
            } else {
                clearInterval(livingroomTimer); // Stop the timer when it reaches zero
            }
        }, 1000)
    }; //end of livingroom game


    // Function to rotate if screen width is smaller than 800px
    function checkScreenWidth() {
        const rotateMessage = document.getElementById("rotateMessage");
    
        if (window.innerWidth < 800 && window.innerHeight > window.innerWidth) {
            // Show the rotate message for portrait mode with width < 800px
            rotateMessage.style.display = "flex";
        } else {
            // Hide the message in other cases
            rotateMessage.style.display = "none";
        }
    }; // end of rotate function
    
    // Run the check on load and on window resize
    window.addEventListener("load", checkScreenWidth);
    window.addEventListener("resize", checkScreenWidth);
}); //end ready


