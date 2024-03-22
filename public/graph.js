var canvas = document.getElementById("rapid_canvas");
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;
var canvasOffset = 50;
var gridInterval = 20;
var pointRadius = 2.5;

function mapInt(value, low1, high1, low2, high2) {
    return low2 + (high2-low2)*(value-low1)/(high1-low1)
}

function drawGrid(canvasCtx) {
    canvasCtx.strokeStyle = "rgb(200, 200, 200)"
    for (let x = canvasOffset; x <= canvasWidth-canvasOffset; x += gridInterval) {
        canvasCtx.beginPath()
        canvasCtx.moveTo(x, canvasOffset)
        canvasCtx.lineTo(x, canvasHeight-canvasOffset)
        canvasCtx.stroke()
    }

    for (let y = canvasOffset; y <= canvasHeight-canvasOffset; y += gridInterval) {
        canvasCtx.beginPath()
        canvasCtx.moveTo(canvasOffset, y)
        canvasCtx.lineTo(canvasWidth-canvasOffset, y)
        canvasCtx.stroke()
    }
}


function drawPoint(canvasCtx, x, y) {
    canvasCtx.beginPath()
    canvasCtx.arc(x-pointRadius, y-pointRadius, pointRadius, 0, 2*Math.PI, true)
    canvasCtx.fill()
}


function drawLineOfBestFit(canvasCtx, xArr, yArr) {
    let n = xArr.length
    let i = -1
    let sx = 0
    let sy = 0
    let sxy = 0
    let sx2 = 0


    xArr.map(val => {
        i++; sx+=xArr[i]; sy+=yArr[i]; sxy+=xArr[i]*yArr[i]; sx2+=xArr[i]**2;
    })

    console.log(`${sx} ${sy} ${sxy} ${sx2}`)

//  beta = ($n*$sxy - $sx*$sy) / ($n*$sx2 - $sx*$sx);
//  $alpha = $sy/$n - $sx*$beta/$n;
    
    let beta = (n*sxy - sx*sy) / (n*sx2 - sx*sx);

    let alpha = sy/n - sx*beta/n
    
    console.log(`y = ${alpha} + ${beta}x`)

    let firstX = canvasOffset

    let lastX = canvasWidth-canvasOffset

    let firstY = alpha + beta*firstX

    let lastY = alpha + beta*lastX

    canvasCtx.strokeStyle = "rgb(0, 0, 0)"

    canvasCtx.beginPath()
    
    canvasCtx.moveTo(firstX, firstY)

    canvasCtx.lineTo(lastX, lastY)
    
    canvasCtx.stroke()

}

function drawScale(canvasCtx, maxRating, expoValue, isExpo, maxGames) {
    for (let y = canvasOffset; y <= canvasHeight-canvasOffset; y += gridInterval) {
  
        let curScale = mapInt(y,canvasOffset, canvasHeight-canvasOffset, maxRating, 0)

        canvasCtx.font = "10px Arial"
        canvasCtx.fillStyle = "rgb(133,133,133)";
        canvasCtx.textAlign = "right"
        canvasCtx.fillText(parseInt(curScale), canvasOffset-3, y+5)
    
    }


    for (let x = canvasOffset; x <= canvasWidth-canvasOffset; x += gridInterval) {


        let curScale = isExpo ? mapInt(Math.pow(x,1/expoValue), canvasOffset, canvasWidth-canvasOffset, 0, maxGames : mapInt(x, canvasOffset, canvasWidth-canvasOffset, 0, Math.log(maxGames))

        console.log(curScale)
        canvasCtx.save()
        canvasCtx.font = "10px Arial"
        canvasCtx.translate(x+5, (canvasHeight-canvasOffset)+3)
        canvasCtx.textAlign = "right"
        canvasCtx.rotate( 270 *Math.PI / 180)
        canvasCtx.fillText(parseInt(curScale), 0, 0)
        canvasCtx.restore()

    }
}

function getCovariance(Arr1, Arr2) {
    let sum = 0
    let arrLength = Arr1.length
    for (let i = 0 ; i < arrLength ; i++) {
        sum += (Arr1[i] - math.mean(Arr1)) * (Arr2[i] - math.mean(Arr2));
    }
    return sum / (arrLength-1)
}

let expoSlider = document.getElementById("expoSlider")
let expoValue = expoSlider.value
let scale = true 

// rapid

function drawRapid(scale, expo) {
    let xArr = []
    let yArr = [] 

    let rapidCanvas = document.getElementById("rapid_canvas")
    let rapidCtx = rapidCanvas.getContext("2d")
    rapidCtx.clearRect(0,0,canvasWidth,canvasHeight)
    let playerGamesPlayed;
    var maxRapidGamesPlayed = 0;
    for (let i = 0; i < playerData.length; i++) {
        playerGamesPlayed = playerData[i].rapid.gamesPlayed
        if (playerGamesPlayed > maxRapidGamesPlayed) {
            maxRapidGamesPlayed = playerGamesPlayed
        }
    }

    let maxRapidRating = 0;
    playerData.map(player => player.rapid.rating > maxRapidRating ? maxRapidRating = player.rapid.rating : maxRapidRating = maxRapidRating);
    //console.log(maxRapidRating)
 
    console.log("Drawing background")
    rapidCtx.fillStyle = "rgb(222,222,222)";
    rapidCtx.fillRect(0,0, canvasWidth, canvasHeight)

    rapidCtx.font = "14px Arial"
    rapidCtx.fillStyle = "rgb(133,133,133)";
    rapidCtx.textAlign = "center"
    rapidCtx.fillText("Games Played", canvasWidth/2, canvasHeight-(canvasOffset/4))

    rapidCtx.save()
    rapidCtx.translate(canvasOffset/3, canvasHeight/2)
    rapidCtx.textAlign = "center"
    rapidCtx.rotate(270*Math.PI / 180)
    rapidCtx.fillText("Rating", 0, 0)
    rapidCtx.restore()

    rapidCtx.beginPath()
    rapidCtx.moveTo(canvasOffset, canvasHeight-canvasOffset)
    rapidCtx.lineTo(canvasWidth-canvasOffset, canvasHeight-canvasOffset)
    rapidCtx.stroke()
  
    rapidCtx.beginPath()
    rapidCtx.moveTo(canvasOffset, canvasHeight-canvasOffset)
    rapidCtx.lineTo(canvasOffset, canvasOffset)
    rapidCtx.stroke()

    drawGrid(rapidCtx)

    if (scale == true) {
        for (let i = 0; i < playerData.length; i++) {
            let rapidRating = playerData[i].rapid.rating
            let rapidGamesPlayed = playerData[i].rapid.gamesPlayed
            let xPos = mapInt(Math.pow(rapidGamesPlayed, 1/expo), 0, Math.pow(maxRapidGamesPlayed, 1/expo), canvasOffset, canvasWidth-canvasOffset)
            xArr.push(xPos)
            let yPos = mapInt(rapidRating, 0, maxRapidRating, canvasHeight-canvasOffset, canvasOffset)
            yArr.push(yPos)
            rapidCtx.fillStyle = "red";
            drawPoint(rapidCtx, xPos-1, yPos-1)
        }
    }

    else {
        for (let i = 0; i < playerData.length; i++) {
            let rapidRating = playerData[i].rapid.rating
            let rapidGamesPlayed = playerData[i].rapid.gamesPlayed
            let xPos = mapInt(Math.log(rapidGamesPlayed), 0, Math.log(maxRapidGamesPlayed), canvasOffset, canvasWidth-canvasOffset)
            xArr.push(xPos)

            let yPos = mapInt(rapidRating, 0, maxRapidRating, canvasHeight-canvasOffset, canvasOffset)
            yArr.push(yPos)
    
            rapidCtx.fillStyle = "red";

            drawPoint(rapidCtx,xPos,yPos)
        }
    }
    
    let covariance = getCovariance(xArr, yArr)

    let devX = math.std(xArr)
    let devY = math.std(yArr)
    
    let correlation = -(covariance / (devX * devY)).toFixed(3)

    document.getElementById("rapidCoefficient").innerHTML = `Correlation coefficient = ${correlation}`


    
    console.log("Drawing line")

    drawLineOfBestFit(rapidCtx, xArr, yArr)

    drawScale(rapidCtx, maxRapidRating, expo, scale, maxRapidGamesPlayed)

}


// blitz 

function drawBlitz(scale, expo) {
    let xArr = []
    let yArr = []

    let blitzCanvas = document.getElementById("blitz_canvas")
    let blitzCtx = blitzCanvas.getContext("2d")

    var maxBlitzGamesPlayed = 0;
    for (let i = 0; i < playerData.length; i++) {
        playerGamesPlayed = playerData[i].blitz.gamesPlayed
        if (playerGamesPlayed > maxBlitzGamesPlayed) {
            maxBlitzGamesPlayed = playerGamesPlayed
        }
    }

    
    let maxBlitzRating = 0;
    playerData.map(player => player.blitz.rating > maxBlitzRating ? maxBlitzRating = player.blitz.rating : maxBlitzRating = maxBlitzRating);
    
    
    blitzCtx.fillStyle = "rgb(222,222,222)";
    blitzCtx.fillRect(0,0, canvasWidth, canvasHeight)

    blitzCtx.font = "14px Arial"
    blitzCtx.fillStyle = "rgb(133,133,133)";
    blitzCtx.textAlign = "center"
    blitzCtx.fillText("Games Played", canvasWidth/2, canvasHeight-(canvasOffset/4))

    blitzCtx.save()
    blitzCtx.translate(canvasOffset/3, canvasHeight/2)
    blitzCtx.textAlign = "center"
    blitzCtx.rotate(270*Math.PI / 180)
    blitzCtx.fillText("Rating", 0, 0)
    blitzCtx.restore()

    blitzCtx.beginPath()
    blitzCtx.moveTo(canvasOffset, canvasHeight-canvasOffset)
    blitzCtx.lineTo(canvasWidth-canvasOffset, canvasHeight-canvasOffset)
    blitzCtx.stroke()

    blitzCtx.beginPath()
    blitzCtx.moveTo(canvasOffset, canvasHeight-canvasOffset)
    blitzCtx.lineTo(canvasOffset, canvasOffset)
    blitzCtx.stroke()

    drawGrid(blitzCtx)

    if (scale == true) {
        for (let i = 0; i < playerData.length; i++) {
            let blitzRating = playerData[i].blitz.rating
            let blitzGamesPlayed = playerData[i].blitz.gamesPlayed
            let xPos = mapInt(Math.pow(blitzGamesPlayed, 1/expo), 0, Math.pow(maxBlitzGamesPlayed, 1/expo), canvasOffset, canvasWidth-canvasOffset)
            xArr.push(xPos)

            let yPos = mapInt(blitzRating, 0, maxBlitzRating, canvasHeight-canvasOffset, canvasOffset)
            yArr.push(yPos)
    
            blitzCtx.fillStyle = "red";
            drawPoint(blitzCtx,xPos,yPos)
        }
    }

    else {
        for (let i = 0; i < playerData.length; i++) {
            let blitzRating = playerData[i].blitz.rating
            let blitzGamesPlayed = playerData[i].blitz.gamesPlayed
            let xPos = mapInt(Math.log(blitzGamesPlayed), 0, Math.log(maxBlitzGamesPlayed), canvasOffset, canvasWidth-canvasOffset)
            xArr.push(xPos)

            let yPos = mapInt(blitzRating, 0, maxBlitzRating, canvasHeight-canvasOffset, canvasOffset)
            yArr.push(yPos)
    
            blitzCtx.fillStyle = "red";
            drawPoint(blitzCtx,xPos,yPos)
        }
    }

    let covariance = getCovariance(xArr, yArr)

    let devX = math.std(xArr)
    let devY = math.std(yArr)
    
    let correlation = -(covariance / (devX * devY)).toFixed(3)

    document.getElementById("blitzCoefficient").innerHTML = `Correlation coefficient = ${correlation}`

    drawLineOfBestFit(blitzCtx, xArr, yArr)
    
}


// bullet

function drawBullet(scale, expo) {
    let xArr = []
    let yArr = []

    let bulletCanvas = document.getElementById("bullet_canvas")
    let bulletCtx = bulletCanvas.getContext("2d")

    var maxBulletGamesPlayed = 0;
    for (let i = 0; i < playerData.length; i++) {
        playerGamesPlayed = playerData[i].bullet.gamesPlayed
        if (playerGamesPlayed > maxBulletGamesPlayed) {
            maxBulletGamesPlayed = playerGamesPlayed
        }
    }

    let maxBulletRating = 0;
    playerData.map(player => player.bullet.rating > maxBulletRating ? maxBulletRating = player.bullet.rating : maxBulletRating = maxBulletRating);
    
    

    console.log("Drawing background")
    bulletCtx.fillStyle = "rgb(222,222,222)";
    bulletCtx.fillRect(0,0, canvasWidth, canvasHeight)

    bulletCtx.font = "14px Arial"
    bulletCtx.fillStyle = "rgb(133,133,133)";
    bulletCtx.textAlign = "center"
    bulletCtx.fillText("Games Played", canvasWidth/2, canvasHeight-(canvasOffset/4))

    bulletCtx.save()
    bulletCtx.translate(canvasOffset/3, canvasHeight/2)
    bulletCtx.textAlign = "center"
    bulletCtx.rotate(270*Math.PI / 180)
    bulletCtx.fillText("Rating", 0, 0)
    bulletCtx.restore()

    bulletCtx.beginPath()
    bulletCtx.moveTo(canvasOffset, canvasHeight-canvasOffset)
    bulletCtx.lineTo(canvasWidth-canvasOffset, canvasHeight-canvasOffset)
    bulletCtx.stroke()
  
    bulletCtx.beginPath()
    bulletCtx.moveTo(canvasOffset, canvasHeight-canvasOffset)
    bulletCtx.lineTo(canvasOffset, canvasOffset)
    bulletCtx.stroke()

    drawGrid(bulletCtx)

    if (scale == true) {
        for (let i = 0; i < playerData.length; i++) {
            let bulletRating = playerData[i].bullet.rating
            let bulletGamesPlayed = playerData[i].bullet.gamesPlayed
            let xPos = mapInt(Math.pow(bulletGamesPlayed, 1/expo), 0, Math.pow(maxBulletGamesPlayed, 1/expo), canvasOffset, canvasWidth-canvasOffset)
            xArr.push(xPos)

            let yPos = mapInt(bulletRating, 0, maxBulletRating, canvasHeight-canvasOffset, canvasOffset)
            yArr.push(yPos)
    
            bulletCtx.fillStyle = "red";
            drawPoint(bulletCtx,xPos,yPos)
        }
    }

    else {
        for (let i = 0; i < playerData.length; i++) {
            let bulletRating = playerData[i].bullet.rating
            let bulletGamesPlayed = playerData[i].bullet.gamesPlayed
            let xPos = mapInt(Math.log(bulletGamesPlayed), 0, Math.log(maxBulletGamesPlayed), canvasOffset, canvasWidth-canvasOffset)
            xArr.push(xPos)
            let yPos = mapInt(bulletRating, 0, maxBulletRating, canvasHeight-canvasOffset, canvasOffset)
            yArr.push(yPos)
            bulletCtx.fillStyle = "red";
            drawPoint(bulletCtx,xPos,yPos)
        }
    }

    let covariance = getCovariance(xArr, yArr)

    let devX = math.std(xArr)
    let devY = math.std(yArr)
    
    let correlation = -(covariance / (devX * devY)).toFixed(3)


    document.getElementById("bulletCoefficient").innerHTML = `Correlation coefficient = ${correlation}`
    
    drawLineOfBestFit(bulletCtx, xArr, yArr)

}


document.getElementById("sample_size").innerHTML = `Sample size: ${playerData.length}`  
var expoButton = document.getElementById("expoButton")
var sliderLabel = document.getElementById("sliderLabel")
var sliderNum = document.getElementById("sliderNum")

drawRapid(scale, expoValue)
drawBullet(scale, expoValue)
drawBlitz(scale, expoValue)


function recalculateExpo() {
    expoValue = expoSlider.value
    drawRapid(scale, expoValue)
    drawBullet(scale, expoValue)
    drawBlitz(scale, expoValue)
    
    // drawRapid(scale, expoValue)
    // drawBullet(scale, expoValue)
    // drawBlitz(scale, expoValue)
}

var exponential = document.getElementById("exponential")

function changeScale() {
    scale = exponential.checked

    if (! scale) {
        expoSlider.classList.add("expoOptions")
        expoButton.classList.add("expoOptions")
        sliderLabel.classList.add("expoOptions")
        sliderNum.classList.add("expoOptions")
    } 

    else {
        expoSlider.classList.remove("expoOptions")
        expoButton.classList.remove("expoOptions")
        sliderLabel.classList.remove("expoOptions")
        sliderNum.classList.remove("expoOptions")

    }
    
    drawRapid(scale, expoValue)
    drawBullet(scale, expoValue)
    drawBlitz(scale, expoValue)
    
    
}



