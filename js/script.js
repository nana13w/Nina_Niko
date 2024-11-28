$(document).ready(() => {
    //global variable
    let score = 0;
    let mistake = 0;
    let totalDraggables = $('.dragElement').length; // Count all draggable elements
    //the score for each room
    let bathroomScore = 0;
    let bedroomScore = 0;
    let kitchenScore = 0;
    let finalScore = 0;
    let livingroomScore = 0;
    //the remaining draggables for each room
    let bathroomRemaining = 15;
    let bedroomRemaining = 15;
    let kitchenRemaining = 15;
    let livingroomRemaining = 15;
    //the timer for each room
    let bathroomTimer = 60;
    let bedroomTimer = 60;
    let kitchenTimer = 60;
    let livingroomTimer = 60;
    //the counter for each room
    let bathroomCounter;
    let bedroomCounter;
    let kitchenCounter;
    let livingroomCounter;
    startBathroomTimer();
    startBedroomTimer();
    startKitchenTimer();
    startLivingroomTimer();


    //Submit name
    $("#nameSub").on("click", setStorage, (event) => {
        event.preventDefault();
        setStorage();
    }); // submit name and prevent 

    function setStorage() {
        let username = $("#username").val();
        localStorage.setItem("username", username);

        //hide the name input after submitting
        $("#name").css("visibility", "hidden").fadeOut(500);
    }











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
        "bathTube": "images/bathroom/bathTube.png",
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
        "abc": "images/bedroom/abcBlocks.png",
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
        "pillows": "images/livingroom/pillows.png",
        "plant": "images/livingroom/plant.png",
        "shelf": "images/livingroom/shelf.png",
        "smallShelf": "images/livingroom/smallShelf.png",
        "blanket": "images/livingroom/blanket.png",
        "sofa": "images/livingroom/sofa.png",
        "table": "images/livingroom/table.png",
        "tv": "images/livingroom/tv.png",
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

    function handleOverEvent(event, ui) {
        $(this).addClass("highlight");

        //Hide character when hovering over
        $("#happyG").css("visibility", "hidden");
        $("#sadG").css("visibility", "hidden");
    }; // end of over event
    function handleOutEvent(event, ui) {
        $(this).removeClass("highlight");

        // Hide character when the element leaves the droppable area
        $("#happyG").css("visibility", "hidden");
        $("#sadG").css("visibility", "hidden");
    }; // end of out event
    function handleDropEvent(event, ui) {
        const droppedId = ui.draggable.attr("id"); // Get the ID of the dropped element
        const droppableId = $(this).attr("id");

        console.log(`Dropped ID: ${droppedId}, Droppable ID: ${droppableId}`); // Debugging log

        if (itemImages[droppedId] && droppableId.includes(droppedId)) {
            $(this).attr("src", itemImages[droppedId]); // Set the image source based on the dropped item

            ui.draggable.css("visibility", "hidden"); // Hide the original draggable element to avoid duplication

            $("#happyG").css("visibility", "visible").fadeIn(300).delay(300).fadeOut(300);

            if (droppableId.includes('bathroom')) {
                bathroomScore++;
                $("#bathroomScore").text(bathroomScore);
                updateRemainingDraggables('bathroom');

                // Store the score in localStorage
                localStorage.setItem('bathroomScore', bathroomScore);

            } else if (droppableId.includes('bedroom')) {
                bedroomScore++;
                $("#bedroomScore").text(bedroomScore);
                updateRemainingDraggables('bedroom');

                // Store the score in localStorage
                localStorage.setItem('bedroomScore', bedroomScore);

            } else if (droppableId.includes('kitchen')) {
                kitchenScore++;
                $("#kitchenScore").text(kitchenScore);
                updateRemainingDraggables('kitchen');

                // Store the score in localStorage
                localStorage.setItem('kitchenScore', kitchenScore);

            } else if (droppableId.includes('livingroom')) {
                livingroomScore++;
                $("#livingroomScore").text(livingroomScore);
                updateRemainingDraggables('livingroom');

                // Store the score in localStorage
                localStorage.setItem('livingroomScore', livingroomScore);
            }

            // Calculate the total score
            let finalScore = bathroomScore + bedroomScore + kitchenScore + livingroomScore;

            console.log("Final Score: " + finalScore);

        } else {

            $("#sadG").css("visibility", "visible").fadeIn(300).delay(300).fadeOut(300);
        }

        if (finalScore === totalDraggables) {
            // All draggables are dropped, open a new window

            window.location.href = 'scoreBoard.html'; // Replace with your URL
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
                bathroomRemaining--;
                bedroomRemaining--;
                kitchenRemaining--;
                livingroomRemaining--
                console.log("Dropped outside the zone. Mistakes: " + mistake);
                console.log(`Bathroom score is: ${bathroomScore}. Mistakes in bathroom are: ${mistake}. Remining is: ${bathroomRemaining}.`);
            }

            ui.draggable.css("visibility", "hidden"); // Hide the original draggable element to avoid duplication

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


                let gameOver = $("#gameOver").on("click", function () {
                    location.reload(true);
                }); //end of gameOver function

            }
        }
    }); // end of mistake counting


       // Function to update the remaining draggables for a specific room
       function updateRemainingDraggables(room) {
        // Decrease the count based on the room
        if (room === 'bathroom') {
            bathroomRemaining--;
            console.log(`Bathroom remaining: ${bathroomRemaining}`);

            // When all draggables are dropped in the bathroom, show the completion div
            if (bathroomRemaining === 0) {
                $("#bathroomLevCompleted").css("visibility", "visible").fadeIn(500);
            }
                // Show bathroom completion div
        }  else if (room === 'bedroom') {
            bedroomRemaining--;
            console.log(`Bedroom remaining: ${bedroomRemaining}`);
            // When all draggables are dropped in the bedroom, show the completion div
            if (bedroomRemaining === 0) {
                $("#bedroomLevCompleted").css("visibility", "visible").fadeIn(500); // Show bedroom completion div
            }
        } else if (room === 'kitchen') {
            kitchenRemaining--;
            console.log(`Kitchen remaining: ${kitchenRemaining}`);
            // When all draggables are dropped in the kitchen, show the completion div
            if (kitchenRemaining === 0) {
                $("#kitchenLevCompleted").css("visibility", "visible").fadeIn(500); // Show kitchen completion div
            }
        } else if (room === 'livingroom') {
            livingroomRemaining--;
            console.log(`Livingroom remaining: ${livingroomRemaining}`);
            // When all draggables are dropped in the livingroom, show the completion div
            if (livingroomRemaining === 0) {
                $("#livingroomLevCompleted").css("visibility", "visible").fadeIn(500); // Show kitchen completion div
                // window.location.href = 'scoreBoard.html'; //redirect to score board page
            }
        }
    }




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
                let countdownBathroom = document.getElementById("bathroomTimer");
                countdownBathroom.innerHTML = " " + bathroomCounter;
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
                let countdownBedroom = document.getElementById("bedroomTimer");
                countdownBedroom.innerHTML = " " + bedroomCounter;
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
                let countdownKitchen = document.getElementById("kitchenTimer");
                countdownKitchen.innerHTML = " " + kitchenCounter;
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
                let countdownLivingroom = document.getElementById("livingroomTimer");
                countdownLivingroom.innerHTML = " " + livingroomCounter;
            } else {
                clearInterval(livingroomTimer); // Stop the timer when it reaches zero
            }
        }, 1000)
    }; //end of livingroom game

    $("#openScoreBoard").on("click", function () {
        startScoreBoard();
    });

    let getName = localStorage.getItem("username");
    if (getName) {
        $("#nameOutput").html(getName);
    } // display name in heading 
    if (getName) {
        $("#scoreName").html(getName);
    } // display name in table

    // Retrieve each score from localStorage
    bathroomScore = parseInt(localStorage.getItem("bathroomScore")) || 0;
    bedroomScore = parseInt(localStorage.getItem("bedroomScore")) || 0;
    kitchenScore = parseInt(localStorage.getItem("kitchenScore")) || 0;
    livingroomScore = parseInt(localStorage.getItem("livingroomScore")) || 0;

    // Calculate the total score
    let totalScore = bathroomScore + bedroomScore + kitchenScore + livingroomScore;



    // Display the total score in the correct element
    $("#finalScoreOutput").text(totalScore);
    $("#scoreScore").text(totalScore);


    function startScoreBoard() {
        $("body").fadeOut(500, function () {
            window.location.href = 'scoreBoard.html';
        });

    };

    $("#openHomePg").on("click", function () {
        $("body").fadeOut(500, function () { // Callback after fadeOut finishes
            window.location.href = 'index.html';
        });
    });


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


