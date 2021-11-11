import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { gsap } from 'gsap'

//----------------------------------Base-------------------------------------

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//--------------------LOADERS, MODELS, ANIMATIONS---------------------------

const loadingBarElement = document.querySelector('.loading-screen')

const loadingManager = new THREE.LoadingManager(
    // Loaded
    () =>
    {
        loadingBarElement.classList.add('ended')
        gsap.delayedCall(1, () =>
        {
            loadingBarElement.classList.add('hide')
            document.getElementById('enterButton').classList.add('show')
        })
        
    },
    // Progress
    (itemURL, itemsLoaded, itemsTotal) =>
    {
        const progressRatio = itemsLoaded / itemsTotal
    }
)

// Animations
let mixer = null
let mixer2 = null
let mixer3 = null
let mixer4 = null

let mixers = [mixer,mixer2,mixer3,mixer4]

let mainDoorAction = null
let computerDoorAction = null
let boardsDoorAction = null
let standInAction = null

// Models
const gltfLoader = new GLTFLoader(loadingManager)

let dishes = [0,1,2,3,4,5,6]

let rug = [0,1]
let book = [0,1]
let key = null

gltfLoader.load(
    '/Assets/gltf/LivingHouse.gltf',
    (gltf) =>
    {
        scene.add(gltf.scene)
    }
)
//Doors
gltfLoader.load(
    'Assets/gltf/mainDoor.gltf',
    (gltf) =>
    {
        mixer = new THREE.AnimationMixer( gltf.scene )
        mainDoorAction = mixer.clipAction(gltf.animations[0])
        mainDoorAction.setLoop( THREE.LoopOnce )
        mainDoorAction.clampWhenFinished = true
        scene.add(gltf.scene)
    }
)
gltfLoader.load(
    'Assets/gltf/bathroomDoor.gltf',
    (gltf) =>
    {
        scene.add(gltf.scene)
    }
)
gltfLoader.load(
    'Assets/gltf/backDoor.gltf',
    (gltf) =>
    {
        scene.add(gltf.scene)
    }
)
gltfLoader.load(
    'Assets/gltf/livingRoomDoor.gltf',
    (gltf) =>
    {
        scene.add(gltf.scene)
    }
)
gltfLoader.load(
    'Assets/gltf/computerRoomDoor.gltf',
    (gltf) =>
    {
        mixer2 = new THREE.AnimationMixer(gltf.scene)
        computerDoorAction = mixer2.clipAction(gltf.animations[0])
        computerDoorAction.setLoop(THREE.LoopOnce)
        computerDoorAction.clampWhenFinished = true
        scene.add(gltf.scene)
    }
)
//boards
gltfLoader.load(
    'Assets/gltf/boards.gltf',
    (gltf) =>
    {
        scene.add(gltf.scene)
    }
)
//Chairs
gltfLoader.load(
    'Assets/gltf/chair.gltf',
    (gltf) =>
    {
        scene.add(gltf.scene)
    }
)
//Boards Door
gltfLoader.load(
    'Assets/gltf/boardsDoor.gltf',
    (gltf) =>
    {
        mixer3 = new THREE.AnimationMixer( gltf.scene )
        boardsDoorAction = mixer3.clipAction(gltf.animations[0])
        boardsDoorAction.setLoop( THREE.LoopOnce )
        boardsDoorAction.clampWhenFinished = true
        scene.add(gltf.scene)
    }
)
//Dishes
gltfLoader.load(
    'Assets/gltf/dishes/dishes0.gltf',
    (gltf) =>
    {
        dishes[0] = gltf.scene
        dishes[0].visible = true
        scene.add(dishes[0])
    }
)
gltfLoader.load(
    'Assets/gltf/dishes/dishes1.gltf',
    (gltf) =>
    {
        dishes[1] = gltf.scene
        dishes[1].visible = false
        scene.add(dishes[1])
    }
)
gltfLoader.load(
    'Assets/gltf/dishes/dishes2.gltf',
    (gltf) =>
    {
        dishes[2] = gltf.scene
        dishes[2].visible = false
        scene.add(dishes[2])
    }
)
gltfLoader.load(
    'Assets/gltf/dishes/dishes3.gltf',
    (gltf) =>
    {
        dishes[3] = gltf.scene
        dishes[3].visible = false
        scene.add(dishes[3])
    }
)
gltfLoader.load(
    'Assets/gltf/dishes/dishes4.gltf',
    (gltf) =>
    {
        dishes[4] = gltf.scene
        dishes[4].visible = false
        scene.add(dishes[4])
    }
)
gltfLoader.load(
    'Assets/gltf/dishes/dishes5.gltf',
    (gltf) =>
    {
        dishes[5] = gltf.scene
        dishes[5].visible = false
        scene.add(dishes[5])
    }
)
gltfLoader.load(
    'Assets/gltf/dishes/dishes6.gltf',
    (gltf) =>
    {
        dishes[6] = gltf.scene
        dishes[6].visible = false
        scene.add(dishes[6])
    }
)
//Rug
gltfLoader.load(
    'Assets/gltf/rug.gltf',
    (gltf) =>
    {
        rug[0] = gltf.scene
        rug[0].visible = false
        scene.add(rug[0])
    }
)
gltfLoader.load(
    'Assets/gltf/rug2.gltf',
    (gltf) =>
    {
        rug[1] = gltf.scene
        scene.add(rug[1])
    }
)
//Book
gltfLoader.load(
    'Assets/gltf/bookState1.gltf',
    (gltf) =>
    {
        book[0] = gltf.scene
        book[0].visible = false
        scene.add(book[0])
    }
)
gltfLoader.load(
    'Assets/gltf/bookState2.gltf',
    (gltf) =>
    {
        book[1] = gltf.scene
        book[1].visible = false
        scene.add(book[1])
    }
)
//Broom
gltfLoader.load(
    'Assets/gltf/broom.gltf',
    (gltf) =>
    {
        gltf.scene
        scene.add(gltf.scene)
    }
)
//StandIn
gltfLoader.load(
    'Assets/gltf/standIn.gltf',
    (gltf) =>
    {
        mixer4 = new THREE.AnimationMixer( gltf.scene )
        standInAction = mixer4.clipAction(gltf.animations[0])
        standInAction.setLoop( THREE.LoopOnce )
        standInAction.clampWhenFinished = true
        gltf.scene
        scene.add(gltf.scene)
    }
)
gltfLoader.load(
    'Assets/gltf/key.gltf',
    (gltf) =>
    {
        key = gltf.scene
        key.position.set(0,-0.17,0.32)
        scene.add(key)
    }
)

//-----------------------HTML Document variables---------------------

const loadingScreenElement = document.getElementById("loading-screen")
const intuitionElement = document.getElementById("intuition")
const intuitionCostElement = document.getElementById("intuitionCost")
const taskbarElement = document.getElementById("taskbar")
const taskFillElement = document.getElementById("taskFill")
const upgradesElement = document.getElementById("upgrades")
const clickerElement = document.getElementById("clicker")

const clickGainElement = document.getElementById("clickGain")
const workerGainElement = document.getElementById("workerGain")
const secret1Element = document.getElementById("secret1")

const navigationElement = document.getElementById("navigation")
const currentRoomElement = document.getElementById("currentRoom")
const currentTaskElement = document.getElementById("currentTask")
const notificationElement = document.getElementById("notification")
const inventoryElement = document.getElementById("inventory")
const enterButtonElement = document.getElementById("enterButton")
const sinkButtonElement = document.getElementById("sinkButton")
const deskButtonElement = document.getElementById("deskButton")
const computerRoomButtonElement = document.getElementById("computerRoomButton")
const floorBoardsButtonElement = document.getElementById("floorBoardsButton")
const bathroomButtonElement = document.getElementById("bathroomButton")
const keepingRoomButtonElement = document.getElementById("keepingRoomButton")
const backDoorButtonElement = document.getElementById("backDoorButton")

const key1Element = document.getElementById("key1")
const boardspdfElement = document.getElementById("boardspdf")

const action1Element = document.getElementById("action1")
const action2Element = document.getElementById("action2")



//-----------------------------IDLE COMPONENT------------------------


//   STAGE STATES
/**
 * Each 'stage' has multiple states -> 
 * 1st State -> [Unlocked'1'/Locked'0'/No Task'2',
 * 2nd State -> TaskCompleted'0'/'1',
 * 3rd State -> TaskTotalCount,
 * 4th State -> TastCurrentCount,
 * 5th State -> TaskStageProgress]
 */

let defaultState = [1,0,0,0,0]
let sinkState = [0,0,500,0,0]
let computerRoomState = [0,0,0,0,0]
let deskState = [0,0,5000,0,0]
let bathroomState = [0,0,200,0,0]
let keepingRoomState = [1,0,50000,0,0]
let backRoomState = [0,0,0,0,0]
let freeRoamState = [1,0,0,0,0]
let backDoorState = [0,0,1000000,0,0]
let TVState = [0,0,10000,0,0]

/**
 * The last item within each stage array is 'taskStageProgress'.
 * This item counts the total amount of timed events, and is 
 * updated according to the amount of items within the
 * 'stageTimedEvenets' Array. The timed events are triggered in
 * order when the number of clicks matches the item.
 */

let defaultTimedEvents = [1]
let sinkTimedEvents = [5, 25, 50, 100, 200, 300, 500]
let computerRoomTimedEvents = [10]
let deskTimedEvents = [1]
let freeRoamTimedEvents = [1]
let backDoorTimedEvents = [1]
let TVTimedEvents = [10,20,30]
let bathroomTimedEvents = [1]
let keepingRoomTimedEvents = []

//   MAIN IDLE COMPONENTS
let intuition = 0

//   SET TASK VARIABLES
let stagePicker = 'default'
let currentStage = 'default'
let taskCompleted = eval(currentStage + 'State')[1]
let taskCurrentCount = eval(currentStage + 'State')[3]
let taskTotalCount = eval(currentStage + 'State')[2]
let taskStageProgress = eval(currentStage + 'State')[4]

//   MAIN CLICKER FUNCTION
clickerElement.addEventListener("click", () =>
{
    if (eval(currentStage + 'State')[0] >= 1 && eval(currentStage + 'State')[1] === 0)
    {
        if(eval(currentStage + 'State')[3] < eval(currentStage + 'State')[2])
        {
            //Increase Task Completion
            taskCurrentCount = eval(currentStage + 'State')[3] + clickCountUp
            eval(currentStage + 'State').splice( 3, 1, taskCurrentCount )
        }
        //Increase Intuition
        intuition += clickCountUp
        //Update HTML
        intuitionElement.innerHTML = Math.round(intuition)
        //Check if task is finished
        if(eval(currentStage + 'State')[3] >= eval(currentStage + 'State')[2])
        {
            //Add the 'Completed' state (1) to stageState array
            eval(currentStage + 'State').splice( 1, 1, 1 )
        }
        console.log(eval(currentStage + 'State'))
    }
})
//   WORKER
let workerCountUp = 0
let TVGain = 2

//---------------------------SOUNDS---------------------------------

const listener = new THREE.AudioListener();
const windowSound = new THREE.PositionalAudio( listener )
const tickingSound = new THREE.PositionalAudio( listener )
const bookSound = new THREE.PositionalAudio( listener )
const voicesSound = new THREE.PositionalAudio( listener )
const audioLoader = new THREE.AudioLoader();


audioLoader.load( 
    '/Assets/ogg/windowAmbience.ogg',
    (buffer) =>
    {
        windowSound.setBuffer( buffer )
        windowSound.setRefDistance( 0.3 )
        windowSound.play()
})
audioLoader.load( 
    '/Assets/ogg/clock.ogg',
    (buffer) =>
    {
        tickingSound.setBuffer( buffer )
        tickingSound.setRefDistance( 0.3 )
        tickingSound.setLoop(THREE.LoopRepeat)
        tickingSound.play()
})
audioLoader.load( 
    '/Assets/ogg/book.ogg',
    (buffer) =>
    {
        bookSound.setBuffer( buffer )
        bookSound.setRefDistance( 1 )
})
audioLoader.load( 
    '/Assets/ogg/voices.ogg',
    (buffer) =>
    {
        voicesSound.setBuffer( buffer )
        voicesSound.setRefDistance( 0.02 )
        voicesSound.setLoop(THREE.LoopRepeat)
        voicesSound.play()
})

const speakerGeo = new THREE.SphereGeometry(0.2,8,8)
const speakerMat = new THREE.MeshBasicMaterial({ color: 0xffffff, visible: true })

const tickingSpeaker = new THREE.Mesh( speakerGeo, speakerMat )
scene.add(tickingSpeaker)
tickingSpeaker.position.set(-1,1.4,0)
tickingSpeaker.add(tickingSound)

const windowSpeaker = new THREE.Mesh( speakerGeo, speakerMat )
scene.add( windowSpeaker )
windowSpeaker.position.set(-1,1.4,9)
windowSpeaker.add( windowSound )

const bookSpeaker = new THREE.Mesh( speakerGeo, speakerMat )
scene.add( bookSpeaker )
bookSpeaker.position.set(-3,1.4,6)
bookSpeaker.add( bookSound )

const voicesSpeaker = new THREE.Mesh( speakerGeo, speakerMat )
scene.add( voicesSpeaker )
voicesSpeaker.position.set(-5.2,1.6,4)
voicesSpeaker.add( voicesSound )


//-------------------------TIMED EVENTS-----------------------------
//  SINK
const sinkEvent0 = () =>
 {
    notificationElement.innerHTML = "You begin washing dishes without knowing why. An inclination of sorts."
 }
 const sinkEvent1 = () =>
 {
    dishes[0].visible = false
    dishes[1].visible = true
    notificationElement.innerHTML = "You found a key in the dishes"
    gsap.delayedCall(0.5, () =>
    {
        gsap.to(key.position, {x:0, y:0.2, z:-0.5, duration: 1})
        gsap.delayedCall(1.2, () =>
        {
            key.visible = false
            key1Element.classList.add("show")
            inventoryElement.classList.add('show')
        })
    })
 }
 const sinkEvent2 = () =>
 {
    dishes[1].visible = false
    dishes[2].visible = true
    deskButtonElement.classList.add('show')
    deskState.splice(0,1,-1)
    book[0].visible = true
    availableButtons.push(deskButtonElement)
    bookSound.play()
    notificationElement.innerHTML = "The sound of a book falling..."
 }
 const sinkEvent3 = () =>
 {
    dishes[2].visible = false
    dishes[3].visible = true
    TVState.splice(0,1,1)
    action1Element.classList.add('show')
    action1Element.innerHTML = "Watch TV"
    notificationElement.innerHTML = "You notice the neighbors TV spur to life."  
 }
 const sinkEvent4 = () =>
 {
    dishes[3].visible = false
    dishes[4].visible = true
    
 }
 const sinkEvent5 = () =>
 {
    dishes[4].visible = false
    dishes[5].visible = true
 }
 const sinkEvent6 = () => 
 {
    dishes[5].visible = false
     dishes[6].visible = true
     sinkState.splice(1,1,1)
 }
//  DESK
const deskEvent0 = () =>
{
    availableButtons.push(backDoorButtonElement, keepingRoomButtonElement, bathroomButtonElement)
    backDoorButtonElement.classList.add('show')
    keepingRoomButtonElement.classList.add('show')
    bathroomButtonElement.classList.add('show')
}
// TV
const TVEvent0 = () =>
{
    notificationElement.innerHTML = "A faint familiarity washes over you as you watch the distant screen."
}
const TVEvent1 = () =>
{
    notificationElement.innerHTML = "Spending quality time relaxing."
}
const TVEvent2 = () =>
{
    standInAction.play()
    notificationElement.innerHTML = "What lies beyond that distant screen?"
}


//------------------------------Lights--------------------------------

// Ambient light
const ambientLight = new THREE.AmbientLight('#ffffff', 0.5)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#ffffff', 0.5)
moonLight.position.set(4, 5, - 2)
scene.add(moonLight)

//   Sizes
const sizes = {
    width: window.innerWidth / 1.3,
    height: window.innerHeight / 1.3
}

//   RESIZE WEBGL CANVAS
window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth / 1.3
    sizes.height = window.innerHeight / 1.3

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

//-----------------------------Camera----------------------------------

let cameraFOV = {x: 65}
let cameraRotation = {x:Math.PI}

// Base camera
const camera = new THREE.PerspectiveCamera(cameraFOV.x, sizes.width / sizes.height, 0.1, 100)
camera.position.y = 1.6
camera.position.z = 3
camera.position.x = 6.1
camera.add( listener )
scene.add(camera)

const lookAtGeometry = new THREE.BoxGeometry(0.01,0.01,0.01)
const lookAtMaterial = new THREE.MeshBasicMaterial({color: 0x000000})
const lookAtObject = new THREE.Mesh(lookAtGeometry, lookAtMaterial)
lookAtObject.visible = false
scene.add(lookAtObject)
lookAtObject.position.y = 1.6



//  TOGGLE BETWEEN 'FIXED' AND 'FREE ROAM'
let freeRoam = false

// First Person Controls

//---------------------GSAP Animations---------------------------

const enter = () =>
{
    gsap.to(camera.position, { x: -1, duration: 2 })
}
const toComputerDoorLocked = () =>
{
    gsap.to(lookAtObject.position, {y: 1.6, duration: 1})
    gsap.to(cameraRotation, {x: Math.PI * 1.5, duration: 1})
    gsap.to(camera.position, {x: -2, z: 3, y: 1.6, duration: 1})
}
const toComputerDoorUnlocked = () =>
{
    gsap.to(lookAtObject.position, {y: 1.6, duration: 1})
    gsap.to(cameraRotation, {x: Math.PI * 1.5, duration: 1})
    gsap.to(lookAtObject.position, {y: 1.4, delay: 1, duration: 1})
    gsap.to(camera.position, {x: -2, z: 2, delay: 1, duration: 1})
    gsap.to(camera.position, {z: -0.5, y: 1.32, x: -1.7, delay: 2, duration: 1})
    gsap.to(cameraRotation, {x: Math.PI * 1.54, delay: 2, duration: 1})
    gsap.to(lookAtObject.position, {y: 1.32, delay: 2, duration: 1})
}
const toComputerDoorJustUnlocked = () =>
{
    gsap.to(camera.position, {z: -0.5, y: 1.32, x: -1.7, delay: 2, duration: 1})
    gsap.to(cameraRotation, {x: Math.PI * 1.54, delay: 2, duration: 1})
    gsap.to(lookAtObject.position, {y: 1.32, delay: 2, duration: 1})
}
const toBathroom = () =>
{
    gsap.to(lookAtObject.position, {y: 1.6, duration: 1})
    gsap.to(cameraRotation, {x: Math.PI * 1.5, duration: 1})
    gsap.to(camera.position, {x: 0, z: 3, duration: 1})
}
const toSink = () =>
{
    gsap.to(cameraRotation, {x: Math.PI * 0.5, duration: 1})
    gsap.to(lookAtObject.position, {y: 1.1, duration: 1})
    gsap.to(camera.position, {x: -1.5, z: 5.5, y: 1.6, duration: 1})
}
const toDesk = () =>
{
    gsap.to(cameraRotation, {x: Math.PI, duration: 1})
    gsap.to(lookAtObject.position, {y: 1.6, duration: 1})
    gsap.to(camera.position, {x: -1.5, z: 5.5, duration: 1})
    gsap.to(camera.position, {x: -3.5, delay: 1, duration: 1})
    gsap.to(camera.position, {z: 5.8, delay: 1, duration: 1})
    gsap.to(lookAtObject.position, {y: 1.3, delay: 1, duration: 1})
}
const writeBook = () =>
{
    gsap.to(camera.position, {x: -4.3, z: 5.85, duration: 1})
    gsap.to(lookAtObject.position, {y: 0.5, duration: 1})
}
const toWriteBook = () =>
{
    gsap.to(cameraRotation, {x: Math.PI, duration: 1})
    gsap.to(lookAtObject.position, {y: 1.6, duration: 1})
    gsap.to(camera.position, {x: -1.5, z: 5.5, duration: 1})
    gsap.to(camera.position, {x: -3.5, delay: 1, duration: 1})
    gsap.to(camera.position, {z: 5.8, delay: 1, duration: 1})
    gsap.to(lookAtObject.position, {y: 1.3, delay: 1, duration: 1})
    gsap.to(camera.position, {x: -4.3, z: 5.85, delay: 1.5, duration: 1})
    gsap.to(lookAtObject.position, {y: 0.5, delay: 1.5, duration: 1})
}
const exitComputerRoom = () =>
{
    gsap.to(camera.position, {x: -2, z: -1, y: 1.6, duration: 1})
    gsap.to(cameraRotation, {x: Math.PI * 0.5, duration: 1})
    gsap.to(lookAtObject.position, {y: 1.6, duration: 1})
    gsap.to(camera.position, {x: -2, z: 1, delay: 1, duration: 1})
}
const toKeepingRoom = () =>
{
    gsap.to(camera.position, {x: -2.5, z: 3.5, duration: 1})
    gsap.to(lookAtObject.position, {y: 1.6, duration: 1})
    gsap.to(cameraRotation, {x: Math.PI * 1.25, duration: 1})
}
const toBackDoor = () =>
{
    gsap.to(camera.position, {x: -3, z: 4, y: 1.6, duration: 1})
    gsap.to(cameraRotation, {x: Math.PI, duration: 1})
    gsap.to(lookAtObject.position, {y: 1.6, duration: 1})
}
const sweepBackDoor = () =>
{
    gsap.to(camera.position, {x: -4, duration: 1})
    gsap.to(lookAtObject.position, {y: 0.5, duration: 1})
    gsap.to(cameraRotation, {x: Math.PI, duration: 1})
}
const listenBackDoor = () =>
{
    gsap.to(camera.position, {x: -5, duration: 1})
    gsap.to(lookAtObject.position, {y: 1.3, duration: 1})
    gsap.to(cameraRotation, {x: Math.PI / 2, duration: 1})
}
const watchTV = () =>
{
    gsap.to(lookAtObject.position, {y: 1.6, duration: 1})
    gsap.to(camera.position, {x: -1.5, z: 6.2, y: 1.7, duration: 1})
    gsap.to(cameraFOV, {x: 1000, duration: 2})
}
const exitTV = () =>
{
    gsap.to(lookAtObject.position, {y: 1.1, duration: 1})
    gsap.to(camera.position, {x: -1.5, z: 5.5, y: 1.6, duration: 1})
    gsap.to(cameraFOV, {x: 65, duration: 1})
    
}


//--------------------------Navigation-----------------------------

let availableButtons = []
let hideButtons = false

const navigationHandler = () =>
{
    if(hideButtons === true)
    {
        availableButtons.forEach(element => 
        
            element.classList.remove('show')
        )
    }
    else if(hideButtons === false)
    {
        availableButtons.forEach(element => 
        
            element.classList.add('show')
        )
    }   
}



// ---------------------HTML EVENT LISTENERS--------------------------

// NAVIGATION

enterButtonElement.addEventListener("click", () =>
{
    if(defaultState[0] === 1 && stagePicker === 'default')
    {
        
        gsap.delayedCall(1, () =>
        {
            enter()
        })
        mainDoorAction.play()
        sinkState.splice( 0, 1, 1 )
        defaultState.splice( 0, 1, 0 )
        availableButtons.push(sinkButtonElement, computerRoomButtonElement)
        enterButtonElement.classList.remove('show')   
        gsap.delayedCall(2, () =>
        {
            computerRoomButtonElement.classList.add('show')
            sinkButtonElement.classList.add('show')
            currentRoomElement.classList.add('show')
            currentRoomElement.innerHTML = "CURRENT ROOM:<br>Living Room"
        })
    }
    else if(defaultState[0] === 2 && stagePicker === 'computerRoom')
    {
        gsap.delayedCall(0.5, () =>
        {
            exitComputerRoom()
        })
        enterButtonElement.classList.remove('show')
        upgradesElement.classList.remove('show')
        hideButtons = false
        navigationHandler()
    }
    else if(currentStage === "TV")
    {
        hideButtons = false
        navigationHandler()
        stagePicker = 'sink'
        action1Element.classList.add('show')
        clickerElement.classList.add('show')
        taskbarElement.classList.add('show')
        enterButtonElement.classList.remove('show')
        workerCountUp -= TVGain
        exitTV()
    }

})
sinkButtonElement.addEventListener("click", () =>
{
    stagePicker = 'sink'
    if(sinkState[0] === 1)
    {
        currentTaskElement.classList.add('show')
        currentTaskElement.innerHTML = "CURRENT TASK:<br>Dishes"
        clickerElement.innerHTML = "Wash Dishes"
        clickerElement.classList.add('show')
        taskbarElement.classList.add('show')
        toSink()
        console.log(sinkState)
    }
    if(TVState[0] === 1)
    {
        action1Element.innerHTML = "Watch TV"
        action1Element.classList.add('show')
    }
})
computerRoomButtonElement.addEventListener("click", () =>
{
    stagePicker = 'computerRoom'
    if(computerRoomState[0] === 0)
    {
        toComputerDoorLocked()
        currentTaskElement.innerHTML = "CURRENT TASK:<br>None"
        clickerElement.classList.remove('show')
        taskbarElement.classList.remove('show')
        action1Element.classList.remove('show')
        action2Element.classList.remove('show')
    }
    else if(computerRoomState[0] === 1)
    {
        toComputerDoorUnlocked()
        currentRoomElement.innerHTML = "CURRENT ROOM:<br>Computer Room"
        currentRoomElement.classList.remove("show")
        hideButtons = true
        navigationHandler()
        gsap.delayedCall(3, () =>
        {
            enterButtonElement.classList.add("show")
            upgradesElement.classList.add("show")
        })
        clickerElement.classList.remove('show')
        taskbarElement.classList.remove('show')
    }
    console.log(computerRoomState)
})
bathroomButtonElement.addEventListener("click", () => 
{
    stagePicker = 'bathroom'

    if(bathroomState[0] === 0)
    {
        toBathroom()
        currentTaskElement.innerHTML = "CURRENT TASK:<br>None"
        clickerElement.classList.remove('show')
        taskbarElement.classList.remove('show')
        action1Element.classList.remove('show')
        action2Element.classList.remove('show')
    }
    else if(bathroomState[0] === 1)
    {
        toBathroom()
        clickerElement.classList.add('show')
        taskbarElement.classList.add('show')
    }
    // easy menu
    // document.getElementById("upgrades").classList.add("show")
})
deskButtonElement.addEventListener("click", () => 
{
    stagePicker = 'desk'
    if(deskState[0] === 0)
    {
        toDesk()
        currentTaskElement.innerHTML = "CURRENT TASK:<br>None"
        clickerElement.classList.remove('show')
        taskbarElement.classList.remove('show')
    }    
    else if(deskState[0] === -1)
    {
        toDesk()
        action1Element.innerHTML = "Open Book"
        gsap.delayedCall(2, () => {
            action1Element.classList.add('show')
        })
        clickerElement.classList.remove('show')
        taskbarElement.classList.remove('show')
    }
    else if(deskState[0] === 2)
    {
        currentTaskElement.innerHTML = "CURRENT TASK:<br>Writing"
        clickerElement.innerHTML = "Write"
        toWriteBook()
        clickerElement.classList.add('show')
        taskbarElement.classList.add('show')
    }
})
keepingRoomButtonElement.addEventListener('click', () =>
{
    stagePicker = 'keepingRoom'
    if(keepingRoomState[0] === 0)
    {
        toKeepingRoom()
        currentRoomElement.innerHTML = "CURRENT ROOM:<br>Living Room"
        currentTaskElement.innerHTML = "CURRENT Task:<br>None"
        action1Element.classList.remove('show')
        action2Element.classList.remove('show')
        clickerElement.classList.remove('show')
        taskbarElement.classList.remove('show')
    }
    else if(keepingRoomState[0] === 1)
    {
        toKeepingRoom()
        currentRoomElement.innerHTML = "CURRENT ROOM:<br>Living Room"
        currentTaskElement.innerHTML = "CURRENT Task:<br>Unfasten Boards"
        clickerElement.classList.add('show')
        taskbarElement.classList.add('show')
    }
})
backDoorButtonElement.addEventListener('click', () =>
{
    stagePicker = 'backDoor'
    if(backRoomState[0] === 0)
    {
        toBackDoor()
        action1Element.innerHTML = "Foot of Door..."
        action2Element.innerHTML = "Listen"
        action1Element.classList.add('show')
        action2Element.classList.add('show')
    }
})
document.getElementById("freeRoamButton").addEventListener('click', () =>
{
    if(freeRoamState[0] === 0)
    {
        console.log("freeRoam not unlocked")
    }
    else if(freeRoamState[0] === 1)
    {
        stagePicker = 'freeRoam'
        freeRoamEnabled = true
        console.log("free roam enabled")
        freeRoamState.splice(0,1,2)
    }
    else if(freeRoamState[0] === 2)
    {
        stagePicker = 'default'
        freeRoamEnabled = false
        console.log("free roam disabled")
        freeRoamState.splice(0,1,1)
    }
})

// Action 1 and 2 for ALL rooms and tasks

action1Element.addEventListener('click', () =>
{
    if(currentStage === "desk" && deskState[0] === -1)
    {
        stagePicker = 'desk'
        book[0].visible = false
        book[1].visible = true
        deskState.splice(0,1,2)
        currentTaskElement.innerHTML = "CURRENT TASK:<br>Writing"
        clickerElement.innerHTML = "Write"
        clickerElement.classList.add('show')
        taskbarElement.classList.add('show')
        action1Element.classList.remove('show')
        writeBook()
    }
    else if(currentStage === 'backDoor')
    {
        sweepBackDoor()
    }
    else if(currentStage === 'sink' && TVState[0] === 1)
    {
        stagePicker = 'TV'
        watchTV()
        enterButtonElement.innerHTML = "Exit"
        action1Element.classList.remove('show')
        clickerElement.classList.remove('show')
        taskbarElement.classList.remove('show')
        enterButtonElement.classList.add('show')
        hideButtons = true
        workerCountUp += TVGain
        navigationHandler()
    }
})
action2Element.addEventListener('click', () =>
{
    console.log('clicked')
    if(currentStage === 'backDoor')
    {
        listenBackDoor()  
    }
})

// INVENTORY

key1Element.addEventListener("click", () =>
{
    if(currentStage === 'computerRoom')
    {
        notificationElement.innerHTML = "You unlocked the computer room door."
        key1Element.classList.remove("show")
        computerRoomState.splice(0,1,1)
        computerDoorAction.play()
        defaultState.splice(0,1,2)
        currentRoomElement.innerHTML = "CURRENT ROOM:<br>Computer Room"
        enterButtonElement.innerHTML = "Exit"
        gsap.delayedCall(3, () =>
        {
            upgradesElement.classList.add('show')
            enterButtonElement.classList.add('show')
        })
        hideButtons = true
        navigationHandler()
        toComputerDoorJustUnlocked()
    }
    else
    {
        notificationElement.innerHTML = "This key cannot be used here."
    }
})
boardspdfElement.addEventListener('click', () =>
{
    if(floorBoardsState[0] === 0)
    {
        
    }
})

document.getElementById('allTasks').addEventListener('click', () =>
{
    document.getElementById("deskButton").classList.add("show")
    document.getElementById("bathroomButton").classList.add("show")
    document.getElementById("keepingRoomButton").classList.add("show")
    document.getElementById("backDoorButton").classList.add("show")
})

// UPGRADES

let intuitionGainCost = 25
let intuitionGainUp = 1
let clickGainCost = 25
let clickCountUp = 1

workerGainElement.addEventListener("click", () =>
{
    if(intuition >= intuitionGainCost)
    {
        intuition -= intuitionGainCost
        workerCountUp += intuitionGainUp
        intuitionGainUp *= 2
        intuitionGainCost *= 3
        notificationElement.innerHTML = "bought worker"
        intuitionCostElement.innerHTML = "&nbsp;-&nbsp;" + String(Math.round(intuitionGainCost))
    }
    else
    {
        notificationElement.innerHTML = "Not enough intuition..."
        console.log("cannot afford")
    }
    document.getElementById("intuition").innerHTML = intuition
})
clickGainElement.addEventListener("click", () =>
{
    if(intuition >= clickGainCost)
    {
        intuition -= clickGainCost
        clickCountUp *= 2
        clickGainCost *= 3
        notificationElement.innerHTML = "bought click"
        intuitionCostElement.innerHTML = "&nbsp;-&nbsp;" + String(Math.round(clickGainCost))
    }
    else
    {
        notificationElement.innerHTML = "Not enough intuition..."
        console.log("cannot afford")
    }
    intuitionElement.innerHTML = intuition
})
workerGainElement.addEventListener("mouseover", () => 
{
    intuitionCostElement.innerHTML = "&nbsp;-&nbsp;" + String(Math.round(intuitionGainCost))
}) 
workerGainElement.addEventListener("mouseout", () => 
{
    intuitionCostElement.innerHTML = ""
}) 
clickGainElement.addEventListener("mouseover", () =>
{
    intuitionCostElement.innerHTML = "&nbsp;-&nbsp;" + String(Math.round(clickGainCost))
})
clickGainElement.addEventListener("mouseout", () => 
{
    intuitionCostElement.innerHTML = ""
}) 
secret1Element.addEventListener("mouseover", () =>
{
    intuitionCostElement.innerHTML = "&nbsp;-&nbsp;" + "500"
})
secret1Element.addEventListener("mouseout", () => 
{
    intuitionCostElement.innerHTML = ""
}) 

//----------------------First Person Controls----------------------------

let keyboard = {}
let freeRoamEnabled = false

const keyDown = (event) =>
{
    keyboard[event.keyCode] = true
}
 
const keyUp = (event) =>
{
    keyboard[event.keyCode] = false
}

window.addEventListener('keydown', keyDown)
window.addEventListener('keyup', keyUp)


//-------------------------------Renderer--------------------------------

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: false
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.outputEncoding = THREE.sRGBEncoding

//---------------------------------Animate-------------------------------

const clock = new THREE.Clock()

let tickValue = 1

let previousTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    

    // Update Animation Mixer
    if(mixer2 !== null && mixer !== null && mixer3 !== null && mixer4 !== null)
    {
        mixer.update(deltaTime)
        mixer2.update(deltaTime)
        mixer3.update(deltaTime)
        mixer4.update(deltaTime)
    }

    currentStage = stagePicker

    //  true tick value
    if(elapsedTime >= tickValue)
    {
        tickValue += 1
        console.log(workerCountUp)
        //Count Up Actions
        intuition += workerCountUp
        taskCurrentCount += workerCountUp
        if(eval(currentStage + 'State')[0] >= 1 && eval(currentStage + 'State')[1] === 0)
        {
            eval(currentStage + 'State').splice(3, 1, taskCurrentCount)
            //Set the stage to 'complete' if currentTask = totalTask
            if(eval(currentStage + 'State')[3] >= eval(currentStage + 'State')[2])
            {
                eval(currentStage + 'State').splice(1,1,1)
            }
        }
        intuitionElement.innerHTML = Math.round(intuition)
    }
    
    if(freeRoamEnabled === true)
    {
        if(keyboard[65])
        {
            cameraRotation.x -= Math.PI * 0.008
        }
        if(keyboard[68])
        {
            cameraRotation.x += Math.PI * 0.008
        }
        if(keyboard[87])
        {
            camera.position.x += Math.cos(cameraRotation.x) * 0.03
            camera.position.z += Math.sin(cameraRotation.x) * 0.03
        }
        if(keyboard[83])
        {
            camera.position.x -= Math.cos(cameraRotation.x) * 0.03
            camera.position.z -= Math.sin(cameraRotation.x) * 0.03
        }
    }
    
    
    //TaskBar Update
    taskFillElement.style.width = 
    ((eval(currentStage + 'State')[3] / 
    eval(currentStage + 'State')[2]) * 100)
    .toString() + "%"

    taskCurrentCount = eval(currentStage + 'State')[3]
    eval(currentStage + 'State').splice( 3, 1, taskCurrentCount )

    /**
     *  EVENT UPDATER
     */
    //  If the current stage click count is equal to the stage event click 
    //  count, trigger stage event, then move to next timed event
    //  eg. if(sinkState[3] = sinkTimedEvents[sinkState[4]])...
    if(eval(currentStage + 'State')[3] >= eval(currentStage + 'TimedEvents')[eval(currentStage + 'State')[4]])
    {
        console.log("timed event reached")

        eval(currentStage + 'Event' + eval(currentStage + 'State')[4])()

        //add 1 to event State of stageState array
        let eventBumper = eval(currentStage + 'State')[4] + 1
        eval(currentStage + 'State').splice( 4, 1, eventBumper )
    }

    // Camera Update
    lookAtObject.position.x = (camera.position.x + (1 * (Math.cos(cameraRotation.x))))
    lookAtObject.position.z = (camera.position.z + (1 * (Math.sin(cameraRotation.x))))
    camera.lookAt(lookAtObject.position)

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()