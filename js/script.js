$(document).ready(() => {
  //global variable
  let droppedItemScore = 0;
  let score = 0;
  let mistake = 0;
  let totalDraggables = $(".dragElement").length; // Count all draggable elements
  let results;
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
  let bathroomTimer;
  let bedroomTimer;
  let kitchenTimer;
  let livingroomTimer;
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
  }); // submit name and preven default actions.

  function setStorage() {
    let username = $("#username").val();
    localStorage.setItem("username", username); //save the name in the storage

    //hide the name input after submitting
    $("#name").css("visibility", "hidden").fadeOut(500);
  }

  const $fadedElements = $(".fadedElements");
  const shuffledElements = $fadedElements
    .toArray()
    .sort(() => Math.random() - 0.5); // Shuffle the faded elements

  // Clear existing elements in the drop zone
  $("#dropZone").empty();

  // Append shuffled elements to the drop zone and apply random rotation
  shuffledElements.forEach((element) => {
    const randomRotation = Math.random() * 360; // Random rotation between 0 and 360 degrees
    $(element).css({
      transform: `rotate(${randomRotation}deg)`, // Apply rotation
    });
    $("#dropZone").append(element);
  });

  // audio on/off
  const gameaudio = $("#gameaudio")[0];
  const btn = $("#audioBtn");
  const icon = $("#audioBtn > i");
  const audio = $("audio")[0];

  btn.on("click", function () {
    if (audio.paused) { // play audio if paused
      console.log("Playing audio");
      audio.volume = 0.3;
      audio
        .play()
        .then(() => {
          icon.removeClass("fa-volume-up");
          icon.addClass("fa-volume-mute");
        })
        .catch((error) => {
          console.error("Error playing audio:", error);
        });
    } else {
      console.log("Pausing audio");
      audio.pause(); //pause audio if playing
      icon.removeClass("fa-volume-mute");
      icon.addClass("fa-volume-up");
    }
  }); //end background audio

  //draggables start here
  $(".dragElement").draggable({
    revert: "invalid",
    start: function (event, ui) {
      ui.helper.css("transform", "rotate(5deg) scale(1.5)");
    },
    stop: function (event, ui) {
      ui.helper.css("transform", "rotate(0deg) scale(1)");
    },
    zIndex: 100,
  });

  //Map draggable items to their corresponding images
  const itemImages = {
    bathTube: "images/bathroom/bathTube.png",
    brush: "images/bathroom/brush.png",
    duck: "images/bathroom/duck.png",
    mirror: "images/bathroom/mirror.png",
    oneTowel: "images/bathroom/oneTowel.png",
    robe: "images/bathroom/robe.png",
    shampoo: "images/bathroom/shampoo.png",
    shower: "images/bathroom/shower.png",
    sink: "images/bathroom/sink.png",
    soap: "images/bathroom/soap.png",
    toilet: "images/bathroom/toilet.png",
    toiletRoll: "images/bathroom/toiletRoll.png",
    toothbrush: "images/bathroom/toothbrush.png",
    toothpaste: "images/bathroom/toothpaste.png",
    towels: "images/bathroom/towels.png",
    abc: "images/bedroom/abcBlocks.png",
    ball: "images/bedroom/ball.png",
    bear: "images/bedroom/bear.png",
    bed: "images/bedroom/bed.png",
    blocks: "images/bedroom/blocks.png",
    car: "images/bedroom/car.png",
    dinosaur: "images/bedroom/dinosaur.png",
    doll: "images/bedroom/doll.png",
    giraffe: "images/bedroom/giraffe.png",
    pillow: "images/bedroom/pillow.png",
    plane: "images/bedroom/plane.png",
    robot: "images/bedroom/robot.png",
    rocket: "images/bedroom/rocket.png",
    spining: "images/bedroom/spring.png",
    train: "images/bedroom/train.png",
    apron: "images/kitchen/apron.png",
    bowl: "images/kitchen/bowl.png",
    chopping: "images/kitchen/chopping.png",
    cup: "images/kitchen/cup.png",
    dishes: "images/kitchen/dishWashing.png",
    glass: "images/kitchen/glass.png",
    gloves: "images/kitchen/gloves.png",
    grater: "images/kitchen/grater.png",
    hanging: "images/kitchen/hangingAccessories.png",
    knife: "images/kitchen/knife.png",
    mixer: "images/kitchen/mixer.png",
    pan: "images/kitchen/pan.png",
    peeler: "images/kitchen/peeler.png",
    toster: "images/kitchen/toster.png",
    whisk: "images/kitchen/whisk.png",
    books: "images/livingroom/books.png",
    bookShelf: "images/livingroom/bookShelf.png",
    chair: "images/livingroom/chair.png",
    lamp: "images/livingroom/lamp.png",
    paint: "images/livingroom/paint.png",
    photo: "images/livingroom/photo.png",
    pillows: "images/livingroom/pillows.png",
    plant: "images/livingroom/plant.png",
    shelf: "images/livingroom/shelf.png",
    smallShelf: "images/livingroom/smallShelf.png",
    blanket: "images/livingroom/blanket.png",
    sofa: "images/livingroom/sofa.png",
    table: "images/livingroom/table.png",
    tv: "images/livingroom/tv.png",
    vase: "images/livingroom/vase.png",
  };

  // loop to iterate over the items in itemImages and log each item
  for (const item in itemImages) {
    if (itemImages.hasOwnProperty(item)) {
    }
  }

  $(".droppableFaded").droppable({
    // Restrict to specific items and match the draggable items id
    accept: function (draggable) {
      const draggedId = draggable.attr("id");
      const droppableId = $(this).attr("id"); // The ID of the droppable area

      // Only allow drop if the draggable item matches the item for this droppable area
      return itemImages[draggedId] && droppableId.includes(draggedId); // Ensures only the correct item is dropped here
    },
    greedy: true, // Prevent event bubbling
    activeClass: "highlight", // Highlight the droppable area when the draggable is over it
    over: handleOverEvent,
    out: handleOutEvent,
    drop: handleDropEvent,
  }); //END OF DROPPABLE

  function handleOverEvent(event, ui) {
    $(this).addClass("highlight");

    //Hide characters when hovering over
    $("#happyG").css("visibility", "hidden");
    $("#sadG").css("visibility", "hidden");
  } // end of over event

  function handleOutEvent(event, ui) {
    $(this).removeClass("highlight");

    // Hide characters when the element leaves the droppable area
    $("#happyG").css("visibility", "hidden");
    $("#sadG").css("visibility", "hidden");
  } // end of out event

  function handleDropEvent(event, ui) {
    const droppedId = ui.draggable.attr("id"); // Get the ID of the dropped element
    const droppableId = $(this).attr("id");

    console.log(`Dropped ID: ${droppedId}, Droppable ID: ${droppableId}`); // Debugging log

    if (itemImages[droppedId] && droppableId.includes(droppedId)) {
      $(this).attr("src", itemImages[droppedId]); // Set the image source based on the dropped item

      ui.draggable.css("visibility", "hidden"); // Hide the original draggable element to avoid duplication

      let correctAnswer = document.getElementById("correctAnswer");
      correctAnswer.currentTime = 0;
      correctAnswer.play();


      $("#happyG")
        .css("visibility", "visible")
        .fadeIn(300)
        .delay(300)
        .fadeOut(300);

      if (droppableId.includes("bathroom")) {
        bathroomScore++;
        $("#bathroomScore").text(bathroomScore);
        updateRemainingDraggables("bathroom");
        // Store the score in localStorage
        localStorage.setItem("bathroomScore", bathroomScore);

      } else if (droppableId.includes("bedroom")) {
        bedroomScore++;
        $("#bedroomScore").text(bedroomScore);
        updateRemainingDraggables("bedroom");
        // Store the score in localStorage
        localStorage.setItem("bedroomScore", bedroomScore);

      } else if (droppableId.includes("kitchen")) {
        kitchenScore++;
        $("#kitchenScore").text(kitchenScore);
        updateRemainingDraggables("kitchen");
        // Store the score in localStorage
        localStorage.setItem("kitchenScore", kitchenScore);

      } else if (droppableId.includes("livingroom")) {
        livingroomScore++;
        $("#livingroomScore").text(livingroomScore);
        updateRemainingDraggables("livingroom");
        // Store the score in localStorage
        localStorage.setItem("livingroomScore", livingroomScore);
      }

      // Calculate the total score
      let finalScore =
        bathroomScore + bedroomScore + kitchenScore + livingroomScore;

      console.log("Final Score: " + finalScore);
    } else {

      let incorrectAnswer = document.getElementById("incorrectAnswer");
      incorrectAnswer.currentTime = 0;
      incorrectAnswer.play(); //incorrect sound effect

      $("#sadG")
        .css("visibility", "visible")
        .fadeIn(300)
        .delay(300)
        .fadeOut(300);
    }

    if (finalScore === totalDraggables) {
      // If all draggables are dropped, open a new window
      window.location.href = "scoreBoard.html";
    }

    $(this).removeClass("highlight"); // Remove the highlight when drop is done
  } // end of drop event fir correct matching

  // Function to update the remaining draggables for a specific room
  function updateRemainingDraggables(room) {
    // Decrease the count based on the room
    if (room === "bathroom") {
      bathroomRemaining--;
      console.log(`Bathroom remaining: ${bathroomRemaining}`);

      // When all draggables are dropped in the bathroom, show the completion div
      if (bathroomRemaining === 0) {
        $("#bathroomLevCompleted").css("visibility", "visible").fadeIn(500);
      
        let levelCompleted = document.getElementById("levelCompleted");
        levelCompleted.currentTime = 0;
        levelCompleted.play(); //level completed - sound effect
      }
      // Show bathroom completion div
    } else if (room === "bedroom") {
      bedroomRemaining--;
      console.log(`Bedroom remaining: ${bedroomRemaining}`);
      // When all draggables are dropped in the bedroom, show the completion div
      if (bedroomRemaining === 0) {
        $("#bedroomLevCompleted").css("visibility", "visible").fadeIn(500); // Show bedroom completion div

        let levelCompleted = document.getElementById("levelCompleted");
        levelCompleted.currentTime = 0;
        levelCompleted.play(); //level completed - sound effect
      }
    } else if (room === "kitchen") {
      kitchenRemaining--;
      console.log(`Kitchen remaining: ${kitchenRemaining}`);
      // When all draggables are dropped in the kitchen, show the completion div
      if (kitchenRemaining === 0) {
        $("#kitchenLevCompleted").css("visibility", "visible").fadeIn(500); // Show kitchen completion div
                
        let levelCompleted = document.getElementById("levelCompleted");
        levelCompleted.currentTime = 0;
        levelCompleted.play(); //level completed - sound effect
      }
    } else if (room === "livingroom") {
      livingroomRemaining--;
      console.log(`Livingroom remaining: ${livingroomRemaining}`);
      // When all draggables are dropped in the livingroom, show the completion div
      if (livingroomRemaining === 0) {
        $("#livingroomLevCompleted").css("visibility", "visible").fadeIn(500); // Show kitchen completion div
                
        let levelCompleted = document.getElementById("levelCompleted");
        levelCompleted.currentTime = 0;
        levelCompleted.play(); //level completed - sound effect
        // window.location.href = 'scoreBoard.html'; //redirect to score board page
      }
    }
  }

  $(".dropZone").droppable({
    // Restrict to specific items and match the draggable items id
    accept: "[data-type='dragElement']",
    drop: function (event, ui) {
      const $draggable = $(ui.draggable);
      droppedItemScore++;
      // Check if the drop happened directly in `.game-area`, not in `.drop-zone`
      const isInDropZone =
        $draggable.hasClass("ui-draggable-dragging") &&
        $(".dropZone").has(ui.helper).length;
      if (!isInDropZone) {
        mistake++;
        bathroomRemaining--;
        bedroomRemaining--;
        kitchenRemaining--;
        livingroomRemaining--;
        console.log(
          `Bathroom score is: ${bathroomScore}. Mistakes in bathroom are: ${mistake}. Remining is: ${bathroomRemaining}.`
        );
        console.log(
          `Bedroom score is: ${bedroomScore}. Mistakes in bedroom are: ${mistake}. Remining is: ${bedroomRemaining}.`
        );
        console.log(
          `Kitchen score is: ${kitchenScore}. Mistakes in kitchen are: ${mistake}. Remining is: ${kitchenRemaining}.`
        );
        console.log(
          `Livingroom score is: ${livingroomScore}. Mistakes in livingroom are: ${mistake}. Remining is: ${livingroomRemaining}.`
        );

        // When all draggables are dropped in each room, show the completion div
        if (bathroomRemaining === 0) {
          $("#bathroomLevCompleted").css("visibility", "visible").fadeIn(500);

        }
        if (bedroomRemaining === 0) {
          $("#bedroomLevCompleted").css("visibility", "visible").fadeIn(500); // Show bedroom completion div
        }
        if (kitchenRemaining === 0) {
          $("#kitchenLevCompleted").css("visibility", "visible").fadeIn(500); // Show kitchen completion div
        }
        if (livingroomRemaining === 0) {
          $("#livingroomLevCompleted").css("visibility", "visible").fadeIn(500); // Show kitchen completion div
          // window.location.href = 'scoreBoard.html'; //redirect to score board page
        }
      }

      ui.draggable.css("visibility", "hidden"); // Hide the original draggable element to avoid duplication

      
      let incorrectAnswer = document.getElementById("incorrectAnswer");
      incorrectAnswer.currentTime = 0;
      incorrectAnswer.play(); //incorrect sound effect

      if (mistake === 1) {
        $("#sadG")
          .css("visibility", "visible")
          .fadeIn(300)
          .delay(300)
          .fadeOut(300);
        $("#heart3").css("visibility", "hidden").fadeOut(300);

      } else if (mistake === 2) {
        $("#sadG")
          .css("visibility", "visible")
          .fadeIn(300)
          .delay(300)
          .fadeOut(300);
        $("#heart2").css("visibility", "hidden").fadeOut(300);
      } else {
        $("#sadG")
          .css("visibility", "visible")
          .fadeIn(300)
          .delay(300)
          .fadeOut(300);
        $("#heart1").css("visibility", "hidden").fadeOut(300);
        $("#gameOverP").css("visibility", "visible").fadeIn(1500).delay(500);
        $("#gameOver").css("visibility", "visible").fadeIn(1500).delay(500);

        //game over sound effect
        let gameOverAudio = document.getElementById("gameOverAudio");
        gameOverAudio.currentTime = 0;
        gameOverAudio.play();

        let gameOver = $("#gameOver").on("click", function () {
          window.location.href = "index.html";
        }); //end of gameOver function
      }
    },
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
  } //end of startBathroom function

  //function to change the location when the startBathroomButton is pressed to bathroom.html - fading out
  function startBathroomGame() {
    $("body").fadeOut(500, function () {
      window.location.href = "bathroom.html";
    });
  } // end of startBathroomGame

  //Function timer
  function startBathroomTimer() {
    let bathroomCounter = 60; // Reset the counter
    let bathroomTimer = setInterval(function () {
      bathroomCounter--;

      // Debug: Log current values
      console.log(
        `Current Counter: ${bathroomCounter}, droppedItemScore: ${droppedItemScore}`
      );

      // Stop the timer when conditions are met
      if (droppedItemScore === 3) {
        clearInterval(bathroomTimer);
        console.log(
          `Bathroom Timer stopped due to droppedItemScore === 3 (GG).`
        );
      } else if (bathroomCounter === 0) {
        clearInterval(bathroomTimer);
        console.log(
          `Bathroom Timer stopped due to bathroomCounter === 0 or MAX Points scored (GG2).`
        );
      } else if (bathroomRemaining === 0) {
        clearInterval(bathroomTimer);
        console.log(
          `Bathroom Timer stopped due to bathroomCounter === 0 or MAX Points scored (GG2).`
        );
      };
      // Update the timer display if the element exists
      let countdownBathroom = document.getElementById("bathroomTimer");
      if (countdownBathroom) {
        countdownBathroom.innerHTML = " " + bathroomCounter;
      }

      // Store the timer in localStorage
      localStorage.setItem("bathroomTimer", bathroomTimer);
    }, 1000);
  }

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
  } //end of startBedroom function

  //function to change the location when the startBedroomButton is pressed to bedroom.html - fading out
  function startBedroomGame() {
    $("body").fadeOut(500, function () {
      window.location.href = "bedroom.html";
    });
  } // end of startBedroomGame

  //Function timer
  function startBedroomTimer() {
    let bedroomCounter = 60; // Reset the counter
    let bedroomTimer = setInterval(function () {
      bedroomCounter--;

      // Debug: Log current values
      console.log(
        `Current Counter: ${bedroomCounter}, droppedItemScore: ${droppedItemScore}`
      );

      // Stop the timer when conditions are met
      if (droppedItemScore === 3) {
        clearInterval(bedroomTimer);
        console.log(
          `Bedroom Timer stopped due to droppedItemScore === 3 (GG).`
        );
      } else if (bedroomCounter === 0 || bedroomRemaining === 0) {
        clearInterval(bedroomTimer);
        console.log(
          `Bedroom Timer stopped due to bedroomCounter === 0 or MAX Points scored (GG2).`
        );
      }
      // Update the timer display if the element exists
      let countdownBedroom = document.getElementById("bedroomTimer");
      if (countdownBedroom) {
        countdownBedroom.innerHTML = " " + bedroomCounter;
      }

      // Store the timer in localStorage
      localStorage.setItem("bedroomTimer", bedroomTimer);
    }, 1000);
  } // End of bathroom timer

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
  } //end of startKitchen function

  //function to change the location when the startKitchenButton is pressed to Kitchen.html - fading out
  function startKitchenGame() {
    $("body").fadeOut(500, function () {
      window.location.href = "kitchen.html";
    });
  } // end of startKitchenGame

  //Function timer
  function startKitchenTimer() {
    let kitchenCounter = 60; // Reset the counter to 60
    let kitchenTimer = setInterval(function () {
      kitchenCounter--;

      // Debug: Log current values
      console.log(
        `Current Counter: ${kitchenCounter}, droppedItemScore: ${droppedItemScore}`
      );

      // Stop the timer when conditions are met
      if (droppedItemScore === 3) {
        clearInterval(kitchenTimer);
        console.log(
          `Kitchen Timer stopped due to droppedItemScore === 3 (GG).`
        );
      } else if (kitchenCounter === 0 || kitchenRemaining === 0) {
        clearInterval(kitchenTimer); // Stop the timer
        console.log(`Kitchen Timer stopped due to bathroomCounter === 0 or MAX Points scored (GG2).`);
      };
      // Update the timer display if the element exists
      let countdownKitchen = document.getElementById("kitchenTimer");
      if (countdownKitchen) {
        countdownKitchen.innerHTML = " " + kitchenCounter;
      }

      // Store the timer in localStorage
      localStorage.setItem("kitchenTimer", kitchenTimer);
    }, 1000);
  } // End of kitchen timer

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
  } //end of startLivingroom function

  //function to change the location when the startLivingroomButton is pressed to livingroom.html - fading out
  function startLivingroomGame() {
    $("body").fadeOut(500, function () {
      window.location.href = "livingroom.html";
    });
  } // end of startLivingroomGame

  //Function timer
  function startLivingroomTimer() {
    let livingroomCounter = 60; // Reset the counter
    let livingroomTimer = setInterval(function () {
      livingroomCounter--;

      // Debug: Log current values
      console.log(
        `Current Counter: ${livingroomCounter}, droppedItemScore: ${droppedItemScore}`
      );

      // Stop the timer when conditions are met
      if (droppedItemScore === 3) {
        clearInterval(livingroomTimer);
        console.log(
          `Livingroom Timer stopped due to droppedItemScore === 3 (GG).`
        );
      } else if (livingroomCounter === 0 || livingroomRemaining === 0) {
        clearInterval(livingroomTimer);
        console.log(`Livingroom Timer stopped due to bathroomCounter === 0 or MAX Points scored (GG2).`);
      };
      // Update the timer display if the element exists
      let countdownLivingroom = document.getElementById("livingroomTimer");
      if (countdownLivingroom) {
        countdownLivingroom.innerHTML = " " + livingroomCounter;
      }


      // Store the timer in localStorage
      localStorage.setItem("livingroomTimer", livingroomTimer);
    }, 1000);
  } // End of bathroom timer

  $("#openScoreBoard").on("click", function () {
    startScoreBoard();

  });

  function startScoreBoard() {
    $("body").fadeOut(500, function () {
      window.location.href = "scoreBoard.html";
    });
  }

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
  let totalScore =
    bathroomScore + bedroomScore + kitchenScore + livingroomScore;
  console.log(
    `Final score: ${bathroomScore} + ${bedroomScore} = ${kitchenScore} + ${livingroomScore} = ${totalScore}`
  );

  // Display the total score in the correct element
  $("#finalScoreOutput").text(totalScore);
  $("#scoreScore").text(totalScore);

  function calculateTotalTime(bathroomTime, bedroomTimer, kitchenTime, livingroomTimer) {
    let finalTime = bathroomTime + bedroomTimer + kitchenTime + livingroomTimer; // Add times together
    console.log(`Total Time: ${finalTime} seconds`);

    return finalTime;  // Return timer result
  }

  // Retrieve each time from localStorage
  bathroomTimer = parseInt(localStorage.getItem("bathroomTimer")) || 0;
  bedroomTimer = parseInt(localStorage.getItem("bedroomTimer")) || 0;
  kitchenTimer = parseInt(localStorage.getItem("kitchenTimer")) || 0;
  livingroomTimer = parseInt(localStorage.getItem("livingroomTimer")) || 0;

  let finalTime = calculateTotalTime(bathroomTimer, bedroomTimer, kitchenTimer, livingroomTimer);

  // Log and display results
  console.log(
    `Final timer: ${bathroomTimer} + ${bedroomTimer} + ${kitchenTimer} + ${livingroomTimer} = ${finalTime}`
  );

  $("#scoreTime").text(finalTime); // Display remaining time

  if (totalScore === 60) {
    $("#star1").css("visibility", "visible");
    $("#star2").css("visibility", "visible");
    $("#star3").css("visibility", "visible");
  } else if (totalScore < 60 && totalScore > 56) {
    $("#star1").css("visibility", "visible");
    $("#star2").css("visibility", "visible");
    $("#star3").css("visibility", "hidden");
  } else {
    $("#star1").css("visibility", "visible");
    $("#star2").css("visibility", "hidden");
    $("#star3").css("visibility", "hidden");
  }

  $("#openHomePg").on("click", function () {
    $("body").fadeOut(500, function () {
      // Callback after fadeOut finishes
      window.location.href = "index.html";
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
  } // end of rotate function

  // Run the check on load and on window resize
  window.addEventListener("load", checkScreenWidth);
  window.addEventListener("resize", checkScreenWidth);
}); //end ready
