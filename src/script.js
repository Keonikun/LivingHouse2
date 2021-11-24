import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { gsap } from 'gsap'

//**********************************************************************

//---------------------------------Base---------------------------------

//**********************************************************************

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

const fog = new THREE.Fog('#262837', 3, 20)
scene.fog = fog

//**********************************************************************

//-------------------LOADERS, MODELS, ANIMATIONS-----------------------

//**********************************************************************

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
let mixer5 = null
let mixer6 = null
let mixer7 = null

let mainDoorAction = null
let computerDoorAction = null
let boardsDoorAction = null
let standInAction = null
let keepingRoomAction = null
let broomAction = null
let bathroomDoorAction = null

// Models
const gltfLoader = new GLTFLoader(loadingManager)

let dishes = [0,1,2,3,4,5,6]

let rug = [0,1]
let book = [0,1]
let key = null
let boards = [0,1,2,3]
let joseki = [0,1,2,3,4,5,6,7,8,9,10,11,12]
let josekiState = 0
let broom = null
let dirt = null
let plants = [0,1,2]

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
        mixer7 = new THREE.AnimationMixer( gltf.scene )
        bathroomDoorAction = mixer7.clipAction(gltf.animations[0])
        bathroomDoorAction.setLoop( THREE.LoopOnce )
        bathroomDoorAction.clampWhenFinished = true
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
        mixer5 = new THREE.AnimationMixer( gltf.scene )
        keepingRoomAction = mixer5.clipAction(gltf.animations[0])
        keepingRoomAction.setLoop( THREE.LoopOnce )
        keepingRoomAction.clampWhenFinished = true
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
        boards[0] = gltf.scene
        boards[0].visible = true
        scene.add(boards[0])
    }
)
gltfLoader.load(
    'Assets/gltf/boards2.gltf',
    (gltf) =>
    {
        boards[1] = gltf.scene
        boards[1].visible = false
        scene.add(boards[1])
    }
)
gltfLoader.load(
    'Assets/gltf/boards3.gltf',
    (gltf) =>
    {
        boards[2] = gltf.scene
        boards[2].visible = false

        scene.add(boards[2])
    }
)
gltfLoader.load(
    'Assets/gltf/boards4.gltf',
    (gltf) =>
    {
        boards[3] = gltf.scene
        boards[3].visible = false

        scene.add(boards[3])
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
        broom = gltf.scene
        broom.visible = false
        mixer6 = new THREE.AnimationMixer( gltf.scene )
        broomAction = mixer6.clipAction(gltf.animations[0])
        broomAction.setLoop( THREE.LoopRepeat )
        broomAction.clampWhenFinished = false
        scene.add(broom)
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
//Key
gltfLoader.load(
    'Assets/gltf/key.gltf',
    (gltf) =>
    {
        key = gltf.scene
        key.position.set(0,-0.17,0.32)
        scene.add(key)
    }
)
//Dirt
gltfLoader.load(
    'Assets/gltf/dirt.gltf',
    (gltf) =>
    {
        dirt = gltf.scene
        scene.add(dirt)
    }
)
//Alphago Joseki
gltfLoader.load(
    'Assets/gltf/go1.gltf',
    (gltf) =>
    {
        joseki[0] = gltf.scene
        joseki[0].visible = true
        scene.add(joseki[0])
    }
)
gltfLoader.load(
    'Assets/gltf/go2.gltf',
    (gltf) =>
    {
        joseki[1] = gltf.scene
        joseki[1].visible = false
        scene.add(joseki[1])
    }
)
gltfLoader.load(
    'Assets/gltf/go3.gltf',
    (gltf) =>
    {
        joseki[2] = gltf.scene
        joseki[2].visible = false
        scene.add(joseki[2])
    }
)
gltfLoader.load(
    'Assets/gltf/go4.gltf',
    (gltf) =>
    {
        joseki[3] = gltf.scene
        joseki[3].visible = false
        scene.add(joseki[3])
    }
)
gltfLoader.load(
    'Assets/gltf/go5.gltf',
    (gltf) =>
    {
        joseki[4] = gltf.scene
        joseki[4].visible = false
        scene.add(joseki[4])
    }
)
gltfLoader.load(
    'Assets/gltf/go6.gltf',
    (gltf) =>
    {
        joseki[5] = gltf.scene
        joseki[5].visible = false
        scene.add(joseki[5])
    }
)
gltfLoader.load(
    'Assets/gltf/go7.gltf',
    (gltf) =>
    {
        joseki[6] = gltf.scene
        joseki[6].visible = false
        scene.add(joseki[6])
    }
)
gltfLoader.load(
    'Assets/gltf/go8.gltf',
    (gltf) =>
    {
        joseki[7] = gltf.scene
        joseki[7].visible = false
        scene.add(joseki[7])
    }
)
gltfLoader.load(
    'Assets/gltf/go9.gltf',
    (gltf) =>
    {
        joseki[8] = gltf.scene
        joseki[8].visible = false
        scene.add(joseki[8])
    }
)
gltfLoader.load(
    'Assets/gltf/go10.gltf',
    (gltf) =>
    {
        joseki[9] = gltf.scene
        joseki[9].visible = false
        scene.add(joseki[9])
    }
)
gltfLoader.load(
    'Assets/gltf/go11.gltf',
    (gltf) =>
    {
        joseki[10] = gltf.scene
        joseki[10].visible = false
        scene.add(joseki[10])
    }
)
gltfLoader.load(
    'Assets/gltf/go12.gltf',
    (gltf) =>
    {
        joseki[11] = gltf.scene
        joseki[11].visible = false
        scene.add(joseki[11])
    }
)
gltfLoader.load(
    'Assets/gltf/go13.gltf',
    (gltf) =>
    {
        joseki[12] = gltf.scene
        joseki[12].visible = false
        scene.add(joseki[12])
    }
)
//Plants
gltfLoader.load(
    'Assets/gltf/plants1.gltf',
    (gltf) =>
    {
        plants[0] = gltf.scene
        plants[0].visible = false
        scene.add(plants[0])
    }
)
gltfLoader.load(
    'Assets/gltf/plants2.gltf',
    (gltf) =>
    {
        plants[1] = gltf.scene
        plants[1].visible = false
        scene.add(plants[1])
    }
)
gltfLoader.load(
    'Assets/gltf/plants3.gltf',
    (gltf) =>
    {
        plants[2] = gltf.scene
        plants[2].visible = false
        scene.add(plants[2])
    }
)

//**********************************************************************

//------------------------------SOUNDS----------------------------------

//**********************************************************************

const listener = new THREE.AudioListener();
const windowSound = new THREE.PositionalAudio(listener)
const tickingSound = new THREE.PositionalAudio(listener)
const bookSound = new THREE.PositionalAudio(listener)
const voicesSound = new THREE.PositionalAudio( listener )
const chimesSound = new THREE.PositionalAudio( listener )
const stoneSound = new THREE.PositionalAudio( listener )
const gateSound = new THREE.PositionalAudio( listener )
const doorSound = new THREE.PositionalAudio( listener )
const audioLoader = new THREE.AudioLoader()


audioLoader.load( 
    '/Assets/ogg/windowAmbience.ogg',
    (buffer) =>
    {
        windowSound.setBuffer( buffer )
        windowSound.setRefDistance( 0.3 )
})
audioLoader.load( 
    '/Assets/ogg/clock.ogg',
    (buffer) =>
    {
        tickingSound.setBuffer( buffer )
        tickingSound.setRefDistance( 0.3 )
        tickingSound.setLoop(THREE.LoopRepeat)
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
        
})
audioLoader.load( 
    '/Assets/ogg/chimes.ogg',
    (buffer) =>
    {
        chimesSound.setBuffer( buffer )
        chimesSound.setRefDistance( 1 )
        chimesSound.setLoop(THREE.LoopRepeat)
})
audioLoader.load( 
    '/Assets/ogg/door.ogg',
    (buffer) =>
    {
        doorSound.setBuffer( buffer )
        doorSound.setRefDistance( 0.1 )
})
audioLoader.load( 
    '/Assets/ogg/stone.ogg',
    (buffer) =>
    {
        stoneSound.setBuffer( buffer )
        stoneSound.setRefDistance( 10 )
        
})
audioLoader.load( 
    '/Assets/ogg/gate.ogg',
    (buffer) =>
    {
        gateSound.setBuffer( buffer )
        gateSound.setRefDistance( 1 )
})

const speakerGeo = new THREE.SphereGeometry(0.2,8,8)
const speakerMat = new THREE.MeshBasicMaterial({ color: 0xffffff, visible: false })

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

const chimesSpeaker = new THREE.Mesh( speakerGeo, speakerMat )
scene.add( chimesSpeaker )
chimesSpeaker.position.set(-1,1.4,9)
chimesSpeaker.add( chimesSound )

const doorSpeaker = new THREE.Mesh( speakerGeo, speakerMat )
scene.add( doorSpeaker )
doorSpeaker.position.set(4,1.4,3)
doorSpeaker.add( doorSound )

const stoneSpeaker = new THREE.Mesh( speakerGeo, speakerMat )
scene.add( stoneSpeaker )
stoneSpeaker.position.set(-7,1.4,0)
stoneSpeaker.add( stoneSound )

const gateSpeaker = new THREE.Mesh( speakerGeo, speakerMat )
scene.add( gateSpeaker )
gateSpeaker.position.set(-1,1.6,9)
gateSpeaker.add( gateSound )

//**********************************************************************

//---------------------------HTML ELEMENTS------------------------------

//**********************************************************************

const loadingScreenElement = document.getElementById("loading-screen")
const intuitionElement = document.getElementById("intuition")
const intuitionCostElement = document.getElementById("intuitionCost")
const taskbarElement = document.getElementById("taskbar")
const taskFillElement = document.getElementById("taskFill")
const upgradesElement = document.getElementById("upgrades")
const clickerElement = document.getElementById("clicker")

const clickGain1Element = document.getElementById("clickGain1")
const workerGain1Element = document.getElementById("workerGain1")
const secret1Element = document.getElementById("secret1")
const broomElement = document.getElementById("broom")
const clickGain2Element = document.getElementById("clickGain2")
const workerGain2Element = document.getElementById("workerGain2")
const stoneElement = document.getElementById("stone")
const coffeeElement = document.getElementById("coffee")
const clickGain3Element = document.getElementById("clickGain3")
const workerGain3Element = document.getElementById("workerGain3")
const hammerElement = document.getElementById("hammer")
const screwdriverElement = document.getElementById("screwdriver")
const clickGain4Element = document.getElementById("clickGain4")
const workerGain4Element = document.getElementById("workerGain4")
const wateringCanElement = document.getElementById("wateringCan")
const chiselElement = document.getElementById("chisel")
const drywallElement = document.getElementById("drywall")

const navigationElement = document.getElementById("navigation")
const currentRoomElement = document.getElementById("currentRoom")
const currentTaskElement = document.getElementById("currentTask")
const notificationElement = document.getElementById("notification")
const upgradeInfoElement = document.getElementById("upgradeInfo")
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
const invBroomElement = document.getElementById("invBroom")
const invStoneElement = document.getElementById("invStone")
const invHammerElement = document.getElementById("invHammer")
const invCoffeeElement = document.getElementById("invCoffee")
const invScrewdriverElement = document.getElementById("invScrewdriver")
const invWateringCanElement = document.getElementById("invWateringCan")
const invChiselElement = document.getElementById("invChisel")
const invDrywallElement = document.getElementById("invDrywall")

const action1Element = document.getElementById("action1")
const action2Element = document.getElementById("action2")


//**********************************************************************

//-----------------------------IDLE COMPONENT---------------------------

//**********************************************************************


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
let bathroomState = [0,0,1000000,0,0]
let keepingRoomState = [1,0,50000,0,0]
let backRoomState = [0,0,0,0,0]
let freeRoamState = [1,0,0,0,0]
let backDoorState = [0,0,5000000,0,0]
let TVState = [0,0,10000,0,0]
let wallTearState = [0,0,0,0,0]
let goBoardState = [0,0,0,0,0]

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
let deskTimedEvents = [1000,3000,5000]
let backDoorTimedEvents = []
let TVTimedEvents = [10,100,1000]
let bathroomTimedEvents = [300000,600000,1000000]
let keepingRoomTimedEvents = [1,1000,3000,10000,20000,30000,40000,50000]
let wallTearTimedEvents = []
let goBoardTimedEvents = []


//   MAIN IDLE COMPONENTS
let intuition = 0
let intuitionGainUp = 1
let clickCountUp = 1
let workerCountUp = 0
let TVGain = 10

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


//**********************************************************************

//---------------------------TIMED EVENTS-------------------------------

//**********************************************************************

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
    windowSound.play()
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
    chimesSound.play()
 }
 const sinkEvent6 = () => 
 {
    dishes[5].visible = false
    dishes[6].visible = true
    sinkState.splice(1,1,1)
    bathroomButtonElement.classList.add('show')
    availableButtons.push(bathroomButtonElement)
    notificationElement.innerHTML = "Bathroom unlocked + new items available in computer room."
 }
//  DESK
const deskEvent0 = () =>
{
    availableButtons.push(backDoorButtonElement)
    backDoorButtonElement.classList.add('show')
    broomElement.classList.add('show')
}
const deskEvent1 = () =>
{
    availableButtons.push(keepingRoomButtonElement)
    keepingRoomButtonElement.classList.add('show')
    keepingRoomState.splice(0,1,1)

}
const deskEvent2 = () =>
{
    // action1Element.innerHTML = "Read Chapter"
    // action1Element.classList.add('show')
    // action2Element.innerHTML = "Start Next Chapter."
    // action2Element.classList.add('show')
    // deskState.splice(0,1,2)
    clickGain2Element.classList.add('show')
    workerGain2Element.classList.add('show')
    // notificationElement.innerHTML = "New items in computer room."
    tickingSound.play()
}

// TV
const TVEvent0 = () =>
{
    notificationElement.innerHTML = "A faint familiarity washes over you as you watch the distant screen."
}
const TVEvent1 = () =>
{
    notificationElement.innerHTML = "Spending quality time relaxing."
    gateSound.play()
}
const TVEvent2 = () =>
{
    standInAction.play()
    notificationElement.innerHTML = "What lies beyond that distant screen?"
    stoneElement.classList.add('show')
    
}
// KEEPING ROOM
const keepingRoomEvent0 = () =>
{
    notificationElement.innerHTML = "Unboarding Keeping Room door."
}
const keepingRoomEvent1 = () =>
{
    boards[0].visible = false
    boards[1].visible = true
}
const keepingRoomEvent2 = () =>
{
    
}
const keepingRoomEvent3 = () =>
{
    boards[1].visible = false
    boards[2].visible = true
}
const keepingRoomEvent4 = () =>
{

}
const keepingRoomEvent5 = () =>
{
    boards[2].visible = false
    boards[3].visible = true
}
const keepingRoomEvent6 = () =>
{
    boards[2].visible = false
    boards[3].visible = true
}
const keepingRoomEvent7 = () =>
{
    boards[3].visible = false
    action1Element.classList.add('show')
    action1Element.innerHTML = "Open Keeping Room Door"
    keepingRoomState.splice(0,1,2)
}
//Bathroom
const bathroomEvent0 = () =>
{
    plants[0].visible = true
}
const bathroomEvent1 = () =>
{
    plants[0].visible = false
    plants[1].visible = true
}
const bathroomEvent2 = () =>
{
    plants[1].visible = false
    plants[2].visible = true
    clickGain3Element.classList.add('show')
    workerGain3Element.classList.add('show')
    
}

//**********************************************************************

//--------------------------Three Js Objects----------------------------

//**********************************************************************

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

//**********************************************************************

//-----------------------------Camera----------------------------------

//**********************************************************************

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

//**********************************************************************

//------------------------GSAP Animations------------------------------

//**********************************************************************

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
const toBathroomUnlocked = () =>
{
    gsap.to(cameraRotation, {x: Math.PI * 2, duration: 1})
    gsap.to(camera.position, {x: 0, z: -0.2, duration: 1})
    gsap.to(camera.position, {x: 1.5, z: 0, y: 2.2, delay: 1, duration: 1})

}
const exitBathroom = () =>
{
    gsap.to(cameraRotation, {x: Math.PI, duration: 1})
    gsap.to(camera.position, {y: 1.6, duration: 1})
    gsap.to(camera.position, {x: 0, z: -0.2, delay: 1, duration: 1})
    gsap.to(cameraRotation, {x: Math.PI * 0.5, delay: 1, duration: 1})
    gsap.to(camera.position, {x: 0, z: 2, delay: 2, duration: 1})
  
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
const toKeepingRoomUnlocked = () =>
{
    gsap.to(camera.position, {x: -2.5, z: 3.5, duration: 1})
    gsap.to(lookAtObject.position, {y: 1.6, duration: 1})
    gsap.to(cameraRotation, {x: Math.PI * 1.25, duration: 1})
    gsap.to(camera.position, {x: -5, z: 1, delay: 1, duration: 1})
    gsap.to(cameraRotation, {x: Math.PI * 1.5, delay: 1, duration: 1})
}
const intoKeepingRoom = () =>
{
    gsap.to(camera.position, {x: -5, z: 1, delay: 0.5, duration: 1})
    gsap.to(cameraRotation, {x: Math.PI * 1.5, delay: 0.5, duration: 1})
}
const exitKeepingRoom = () =>
{
    gsap.to(camera.position, {x: -5, z: 1, duration: 1})
    gsap.to(cameraRotation, {x: Math.PI * 0.25, duration: 1})
    gsap.to(camera.position, { x: -3, z: 3, delay: 1.1, duration: 2 })
    gsap.to(lookAtObject.position, {y: 1.6, duration: 1 })
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
const toGoBoard = () =>
{
    gsap.to(camera.position, {x: -6.6, z: -0.95, duration: 1})
    gsap.to(cameraRotation, {x: Math.PI, duration: 1})
    gsap.to(lookAtObject.position, {y: 0, duration: 1 })
}
const toWallTear = () =>
{
    gsap.to(camera.position, {x: -4, z: -2.05, duration: 1})
    gsap.to(cameraRotation, {x: Math.PI * 2, duration: 1})
    gsap.to(lookAtObject.position, {y: 1.6, duration: 1 })
}

//**********************************************************************

// -------------------------Navigation-----------------------------

//**********************************************************************


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

//**********************************************************************

// ---------------------HTML EVENT LISTENERS--------------------------

//**********************************************************************

// NAVIGATION

enterButtonElement.addEventListener("click", () =>
{
    if(defaultState[0] === 1 && stagePicker === 'default')
    {
        gsap.delayedCall(1, () =>
        {
            enter()
        })
        doorSound.play()
        mainDoorAction.play()
        voicesSound.play()
        sinkState.splice( 0, 1, 1 )
        defaultState.splice( 0, 1, 0 )
        availableButtons.push(sinkButtonElement, computerRoomButtonElement,deskButtonElement)
        enterButtonElement.classList.remove('show')   
        gsap.delayedCall(2, () =>
        {
            computerRoomButtonElement.classList.add('show')
            sinkButtonElement.classList.add('show')
            currentRoomElement.classList.add('show')
            deskButtonElement.classList.add('show')
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
        upgradesOpen = false
        navigationHandler()
        action1Element.classList.remove('show')
        action2Element.classList.remove('show')
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
    else if(defaultState[0] === 3)
    {
        hideButtons = false
        navigationHandler()
        enterButtonElement.classList.remove('show')
        exitKeepingRoom()
        sinkButtonElement.innerHTML = "Sink"
        computerRoomButtonElement.innerHTML = "Computer<br>Room"
        defaultState.splice(0,1,2)
        action1Element.classList.remove('show')
        action2Element.classList.remove('show')
    }
    else if(currentStage === 'bathroom')
    {
        exitBathroom()
        stagePicker = 'default'
        hideButtons = false
        gsap.delayedCall(2,() =>
        {
            navigationHandler()
        })

        enterButtonElement.classList.remove('show')
        clickerElement.classList.remove('show')
        taskbarElement.classList.remove('show')
        action1Element.classList.remove('show')
        action2Element.classList.remove('show')
    }

})
sinkButtonElement.addEventListener("click", () =>
{ 
    if(sinkState[0] === 1 && defaultState[0] != 3)
    {
        stagePicker = 'sink'
        currentTaskElement.classList.add('show')
        currentTaskElement.innerHTML = "CURRENT TASK:<br>Dishes"
        clickerElement.innerHTML = "Wash Dishes"
        clickerElement.classList.add('show')
        taskbarElement.classList.add('show')
        toSink()
        console.log(sinkState)
        if(TVState[0] === 1)
    {
        action1Element.innerHTML = "Watch TV"
        action1Element.classList.add('show')
        }
    }
    else if(defaultState[0] === 3)
    {
        if(goBoardState[0] === 0)
        {
            stagePicker = 'goBoard'
            toGoBoard()
        }
        else if(goBoardState[0] === 1)
        {
            stagePicker = 'goBoard'
            toGoBoard()
            action1Element.classList.add('show')
            action1Element.innerHTML = "Pick Up Back-Door Key"
        }

    }
})
computerRoomButtonElement.addEventListener("click", () =>
{
    
    if(computerRoomState[0] === 0  && defaultState[0] != 3)
    {
        stagePicker = 'computerRoom'
        toComputerDoorLocked()
        currentTaskElement.innerHTML = "CURRENT TASK:<br>None"
        clickerElement.classList.remove('show')
        taskbarElement.classList.remove('show')
        action1Element.classList.remove('show')
        action2Element.classList.remove('show')
    }
    else if(computerRoomState[0] === 1 && defaultState[0] != 3)
    {
        stagePicker = 'computerRoom'
        toComputerDoorUnlocked()
        currentRoomElement.innerHTML = "CURRENT ROOM:<br>Computer Room"
        currentRoomElement.classList.remove("show")
        hideButtons = true
        defaultState.splice(0,1,2)
        navigationHandler()
        gsap.delayedCall(3, () =>
        {
            enterButtonElement.classList.add("show")
            upgradesElement.classList.add("show")
            upgradesOpen = true
        })
        clickerElement.classList.remove('show')
        taskbarElement.classList.remove('show')
        action1Element.classList.remove('show')
        action2Element.classList.remove('show')
    }
    else if(defaultState[0] === 3)
    {
        stagePicker = 'wallTear'
        toWallTear()
        console.log("wallTear")
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
        action1Element.classList.add('show')
        action1Element.innerHTML = "Open Bathroom Door"
        action2Element.classList.remove('show')
    }
    else if(bathroomState[0] === 1)
    {
        toBathroom()
        gsap.delayedCall(1, () =>
        {
            toBathroomUnlocked()
            enterButtonElement.classList.add('show')
            clickerElement.classList.add('show')
            taskbarElement.classList.add('show')
            clickerElement.innerHTML = "Water Plant"
        })
        hideButtons = true
        navigationHandler()
        stagePicker = 'bathroom'
        action1Element.classList.remove('show')
        action2Element.classList.remove('show')

    }
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
        action1Element.classList.remove('show')
        action2Element.classList.remove('show')
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
        action2Element.classList.remove('show')
    }
    else if(deskState[0] === 2)
    {
        currentTaskElement.innerHTML = "CURRENT TASK:<br>Writing"
        clickerElement.innerHTML = "Write"
        toWriteBook()
        clickerElement.classList.add('show')
        taskbarElement.classList.add('show')
        action1Element.classList.remove('show')
        action2Element.classList.remove('show')
    }
    else if(deskState[0] === 3)
    {
        action1Element.classList.add('show')
        action2Element.classList.add('show')
        action1Element.innerHTML = "Read First Chapter"
        action2Element.innerHTML = "Write Next Chapter"
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
        clickerElement.innerHTML = "Unfasten Boards"
        action1Element.classList.remove('show')
        action2Element.classList.remove('show')
        clickerElement.classList.add('show')
        taskbarElement.classList.add('show')
    }
    else if(keepingRoomState[0] === 2)
    {
        toKeepingRoomUnlocked()
        currentRoomElement.innerHTML = "CURRENT ROOM:<br>Keeping Room"
        currentTaskElement.innerHTML = "CURRENT Task:<br>None"
        action1Element.classList.remove('show')
        action2Element.classList.remove('show')
        clickerElement.classList.remove('show')
        taskbarElement.classList.remove('show')
        hideButtons = true
        navigationHandler()
        gsap.delayedCall(0.5, () =>
        {
            enterButtonElement.classList.add('show')
            sinkButtonElement.classList.add('show')
            sinkButtonElement.innerHTML = "Go<br>Board"
            computerRoomButtonElement.innerHTML = "Wall<br>Tear"
            computerRoomButtonElement.classList.add('show')
        })
        stagePicker = 'default'
        defaultState.splice(0,1,3)
    }
})
backDoorButtonElement.addEventListener('click', () =>
{
    
    if(backRoomState[0] === 0)
    {
        stagePicker = 'backDoor'
        toBackDoor()
        action1Element.innerHTML = "Foot of Door..."
        action2Element.innerHTML = "Listen"
        action1Element.classList.add('show')
        action2Element.classList.add('show')
    }
    else if(backRoomState[0] === 1)
    {
        stagePicker = 'backDoor'
        sweepBackDoor()
        action1Element.innerHTML = "Foot of Door..."
        action2Element.innerHTML = "Listen"
        action1Element.classList.add('show')
        action2Element.classList.add('show')
        taskbarElement.classList.add('show')
        clickerElement.classList.add('show')
        clickerElement.innerHTML = "Sweep Under Door"
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
    else if(currentStage === 'keepingRoom' && keepingRoomState[0] === 2)
    {
        stagePicker = 'default'
        action1Element.classList.remove('show')
        keepingRoomAction.play()
        hideButtons = true
        navigationHandler()
        
        taskbarElement.classList.remove('show')
        clickerElement.classList.remove('show')
        gsap.delayedCall(0.5, () =>
        {
            enterButtonElement.innerHTML = "Exit"
            sinkButtonElement.innerHTML = "Go<br>Board"
            computerRoomButtonElement.innerHTML = "Torn<br>Wall"
            enterButtonElement.classList.add('show')
            sinkButtonElement.classList.add('show')
            computerRoomButtonElement.classList.add('show')
        })
        intoKeepingRoom()
        doorSpeaker.position.set(-5,1.4,0)
        doorSound.play()
        stagePicker = 'default'
        defaultState.splice(0,1,3)
    }
    else if(currentStage === 'bathroom')
    {  
        gsap.delayedCall(1.5, () =>
        {
            toBathroomUnlocked()
        })
        hideButtons = true
        navigationHandler()
        stagePicker = 'bathroom'
        bathroomState.splice(0,1,1)
        gsap.delayedCall(3, () =>
        {
            taskbarElement.classList.add('show')
            clickerElement.classList.add('show')
            enterButtonElement.classList.add('show')
        })
        bathroomDoorAction.play()
        doorSpeaker.position.set(-1,1.4,0)
        doorSound.play()
        clickerElement.innerHTML = "Water Plant"    
        action1Element.classList.remove('show')
        enterButtonElement.innerHTML = "Exit"
    }
    else if(currentStage === "desk" && deskState[0] === 2)
    {
        notificationElement.innerHTML = "Reading book :)"
    }
    else if(currentStage === 'goBoard' && goBoardState[0] === 1)
    {
        notificationElement.innerHTML = "This marks the end of this demo. Thank you for playing and expect more to come soon."

        goBoardState.splice(0,1,0)
        action1Element.classList.remove('show')
    }
})
action2Element.addEventListener('click', () =>
{
    if(currentStage === 'backDoor')
    {
        listenBackDoor()  
    }
    else if(currentStage === "desk" && deskState[0] === 2)
    {
        notificationElement.innerHTML = "starting next chapter"
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
            upgradesOpen = true
        })
        hideButtons = true
        doorSpeaker.position.set(-1,1.4,0)
        doorSound.play()
        navigationHandler()
        toComputerDoorJustUnlocked()
    }
    else
    {
        notificationElement.innerHTML = "This key cannot be used here."
    }
})
invBroomElement.addEventListener("click", () =>
{
    if(currentStage === 'backDoor')
    {
        notificationElement.innerHTML = "REEEEE"
        broom.visible = true
        backDoorState.splice(0,1,1)
        sweepBackDoor()
        gsap.delayedCall(0.5, () =>
        {
            broomAction.play()
        })
        invBroomElement.classList.remove('show')
        taskbarElement.classList.add('show')
        clickerElement.classList.add('show')
        clickerElement.innerHTML = "Sweep Under Door"
    }
    else
    {
        notificationElement.innerHTML = "You cannot use the broom here."
    }
})
invStoneElement.addEventListener("click", () =>
{
    if(currentStage === 'goBoard')
    {
        console.log('yep')
        if((stoneCount - stonesPlayed) > 0 && yourTurn === true)
        {
            joseki[josekiState].visible = false
            josekiState += 1
            stonesPlayed += 1
            josekiTimerStart = true
            joseki[josekiState].visible = true
            yourTurn = false
            console.log("played move")
            stoneSound.play()
        }
        else if((stoneCount - stonesPlayed) > 0 && yourTurn === false)
        {
            notificationElement.innerHTML = 'It is not your turn.'
        }
    }  
    else
    {
        notificationElement.innerHTML = "You cannot use this item here."
    }
    if(stonesPlayed >= 6 || stoneCount - stonesPlayed === 0)
    {
        invStoneElement.classList.remove('show')
    }
    
})
invCoffeeElement.addEventListener("click", () =>
{
    
})
invHammerElement.addEventListener("click", () =>
{
    
})
invScrewdriverElement.addEventListener("click", () =>
{
    
})
invWateringCanElement.addEventListener("click", () =>
{
    
})
invChiselElement.addEventListener("click", () =>
{
    
})
invDrywallElement.addEventListener("click", () =>
{
    
})

// UPGRADES
let clickGain1Cost = 25
let workerGain1Cost = 25
let clickGain2Cost = 10000
let workerGain2Cost = 10000
let clickGain3Cost = 1000000
let workerGain3Cost = 1000000
let broomCost = 50000
let stoneCost = 500000
let coffeeCost = 1000000
let hammerCost = 5000000
let screwdriverCost = 10000000
let wateringCanCost = 50000000
let chiselCost = 100000000
let drywallCost = 100000000

let workerGain1Up = 2
let workerGain2Up = 100
let workerGain3Up = 10000
let clickGain1Up = 4
let clickGain2Up = 400
let clickGain3Up = 40000

let upgradesOpen = false

let broomHide = false
let stoneCount = 0
let stonesPlayed = 0

const upgradeButtons = () =>
{
    //Click
    workerGain1Element.addEventListener("click", () =>
    {
        if(intuition >= workerGain1Cost)
        {
            intuition -= workerGain1Cost
            workerCountUp += intuitionGainUp
            intuitionGainUp += workerGain1Up
            workerGain1Cost *= 2
            notificationElement.innerHTML = "bought worker"
            intuitionCostElement.innerHTML = "&nbsp;-&nbsp;" + String(Math.round(workerGain1Cost))
        }
        else
        {
            notificationElement.innerHTML = "Not enough intuition..."
            console.log("cannot afford")
        }
        document.getElementById("intuition").innerHTML = intuition
    })
    workerGain2Element.addEventListener("click", () =>
    {
        if(intuition >= workerGain2Cost)
        {
            intuition -= workerGain2Cost
            workerCountUp += workerGain2Up
            workerGain2Cost *= 2
            notificationElement.innerHTML = "bought worker"
            intuitionCostElement.innerHTML = "&nbsp;-&nbsp;" + String(Math.round(workerGain2Cost))
        }
        else
        {
            notificationElement.innerHTML = "Not enough intuition..."
            console.log("cannot afford")
        }
        intuitionElement.innerHTML = intuition
    })
    workerGain3Element.addEventListener("click", () =>
    {
        if(intuition >= workerGain3Cost)
        {
            intuition -= workerGain3Cost
            workerCountUp += workerGain3Up
            workerGain3Cost *= 2
            notificationElement.innerHTML = "bought worker"
            intuitionCostElement.innerHTML = "&nbsp;-&nbsp;" + String(Math.round(workerGain3Cost))
        }
        else
        {
            notificationElement.innerHTML = "Not enough intuition..."
            console.log("cannot afford")
        }
        intuitionElement.innerHTML = intuition
    })
    clickGain1Element.addEventListener("click", () =>
    {
        if(intuition >= clickGain1Cost)
        {
            intuition -= clickGain1Cost
            clickCountUp += clickGain1Up
            clickGain1Cost *= 2
            notificationElement.innerHTML = "bought click"
            intuitionCostElement.innerHTML = "&nbsp;-&nbsp;" + String(Math.round(clickGain1Cost))
        }
        else
        {
            notificationElement.innerHTML = "Not enough intuition..."
            console.log("cannot afford")
        }
        intuitionElement.innerHTML = intuition
    })
    clickGain2Element.addEventListener("click", () =>
    {
        if(intuition >= clickGain2Cost)
        {
            intuition -= clickGain2Cost
            clickCountUp += clickGain2Up
            clickGain2Cost *= 2
            notificationElement.innerHTML = "bought click"
            intuitionCostElement.innerHTML = "&nbsp;-&nbsp;" + String(Math.round(clickGain2Cost))
        }
        else
        {
            notificationElement.innerHTML = "Not enough intuition..."
            console.log("cannot afford")
        }
        intuitionElement.innerHTML = intuition
    })
    clickGain3Element.addEventListener("click", () =>
    {
        if(intuition >= clickGain3Cost)
        {
            intuition -= clickGain3Cost
            clickCountUp += clickGain3Up
            clickGain3Cost *= 2
            notificationElement.innerHTML = "bought click"
            intuitionCostElement.innerHTML = "&nbsp;-&nbsp;" + String(Math.round(clickGain3Cost))
        }
        else
        {
            notificationElement.innerHTML = "Not enough intuition..."
            console.log("cannot afford")
        }
        intuitionElement.innerHTML = intuition
    })
    broomElement.addEventListener("click", () =>
    {
        if(intuition >= broomCost)
        {
            intuition -= broomCost
            notificationElement.innerHTML = "Bought broom"
            invBroomElement.classList.add('show')
            intuitionCostElement.innerHTML = "&nbsp;-&nbsp;" + String(Math.round(broomCost))
            broomElement.classList.remove('show')
            broomHide = true
        }
        else
        {
            notificationElement.innerHTML = "Not enough intuition..."
            console.log("cannot afford")
        }
        intuitionElement.innerHTML = intuition
    })
    stoneElement.addEventListener("click", () =>
    {
        if(intuition >= stoneCost && stoneCount < 6)
        {
            intuition -= stoneCost
            invStoneElement.classList.add('show')
            stoneCount += 1
            notificationElement.innerHTML = "bought stone"
            intuitionCostElement.innerHTML = "&nbsp;-&nbsp;" + String(Math.round(stoneCost))
            if((stoneCount - stonesPlayed) > 1)
            {
                invStoneElement.innerHTML = "stone<br>.obj&nbsp;(" + String(stoneCount - stonesPlayed) + ")"
            }
            if(stoneCount >= 6)
            {
                stoneElement.classList.remove('show')
            }
        }
        else
        {
            notificationElement.innerHTML = "Not enough intuition..."
            console.log("cannot afford")
        }
        intuitionElement.innerHTML = intuition
    })
    coffeeElement.addEventListener("click", () =>
    {
        if(intuition >= coffeeCost)
        {
            intuition -= coffeeCost
            notificationElement.innerHTML = "bought coffee"
            intuitionCostElement.innerHTML = "&nbsp;-&nbsp;" + String(Math.round(coffeeCost))
        }
        else
        {
            notificationElement.innerHTML = "Not enough intuition..."
            console.log("cannot afford")
        }
        intuitionElement.innerHTML = intuition
    })
    hammerElement.addEventListener("click", () =>
    {
        if(intuition >= hammerCost)
        {
            intuition -= hammerCost
            notificationElement.innerHTML = "bought coffee"
            intuitionCostElement.innerHTML = "&nbsp;-&nbsp;" + String(Math.round(hammerCost))
        }
        else
        {
            notificationElement.innerHTML = "Not enough intuition..."
            console.log("cannot afford")
        }
        intuitionElement.innerHTML = intuition
    })
    screwdriverElement.addEventListener("click", () =>
    {
        if(intuition >= screwdriverCost)
        {
            intuition -= screwdriverCost
            notificationElement.innerHTML = "bought coffee"
            intuitionCostElement.innerHTML = "&nbsp;-&nbsp;" + String(Math.round(screwdriverCost))
        }
        else
        {
            notificationElement.innerHTML = "Not enough intuition..."
            console.log("cannot afford")
        }
        intuitionElement.innerHTML = intuition
    })
    wateringCanElement.addEventListener("click", () =>
    {
        if(intuition >= wateringCanCost)
        {
            intuition -= wateringCanCost
            notificationElement.innerHTML = "bought watering can"
            intuitionCostElement.innerHTML = "&nbsp;-&nbsp;" + String(Math.round(wateringCanCost))
        }
        else
        {
            notificationElement.innerHTML = "Not enough intuition..."
            console.log("cannot afford")
        }
        intuitionElement.innerHTML = intuition
    })
    chiselElement.addEventListener("click", () =>
    {
        if(intuition >= chiselCost)
        {
            intuition -= chiselCost
            notificationElement.innerHTML = "bought chisel"
            intuitionCostElement.innerHTML = "&nbsp;-&nbsp;" + String(Math.round(chiselCost))
        }
        else
        {
            notificationElement.innerHTML = "Not enough intuition..."
            console.log("cannot afford")
        }
        intuitionElement.innerHTML = intuition
    })
    drywallElement.addEventListener("click", () =>
    {
        if(intuition >= drywallCost)
        {
            intuition -= drywallCost
            notificationElement.innerHTML = "bought drywall"
            intuitionCostElement.innerHTML = "&nbsp;-&nbsp;" + String(Math.round(drywallCost))
        }
        else
        {
            notificationElement.innerHTML = "Not enough intuition..."
            console.log("cannot afford")
        }
        intuitionElement.innerHTML = intuition
    })

    //Mouse Over and Mouse Out
    workerGain1Element.addEventListener("mouseover", () => 
    {
        if(upgradesOpen === true){
            intuitionCostElement.innerHTML = "&nbsp;-&nbsp;" + String(Math.round(workerGain1Cost))
            upgradeInfoElement.innerHTML = "Adds +&nbsp;" + String(workerGain1Up) + "&nbsp;to your passive intuition gain."
        }    
    }) 
    workerGain1Element.addEventListener("mouseout", () => 
    {
        intuitionCostElement.innerHTML = ""
        upgradeInfoElement.innerHTML = ""
    }) 
    clickGain1Element.addEventListener("mouseover", () =>
    {
        if(upgradesOpen === true){
            intuitionCostElement.innerHTML = "&nbsp;-&nbsp;" + String(Math.round(clickGain1Cost))
            upgradeInfoElement.innerHTML = "+&nbsp;" + String(clickGain1Up) + "&nbsp;Intuition per click."
        }    
        
    })
    clickGain1Element.addEventListener("mouseout", () => 
    {
        intuitionCostElement.innerHTML = ""
        upgradeInfoElement.innerHTML = ""
    })
    workerGain2Element.addEventListener("mouseover", () => 
    {
        if(upgradesOpen === true){
            intuitionCostElement.innerHTML = "&nbsp;-&nbsp;" + String(Math.round(workerGain2Cost))
            upgradeInfoElement.innerHTML = "Adds +&nbsp;" + String(workerGain2Up) + "&nbsp;to your passive Intuition gain."
        }    
        
    }) 
    workerGain2Element.addEventListener("mouseout", () => 
    {
        intuitionCostElement.innerHTML = ""
        upgradeInfoElement.innerHTML = ""
    }) 
    clickGain2Element.addEventListener("mouseover", () =>
    {
        if(upgradesOpen === true){
            intuitionCostElement.innerHTML = "&nbsp;-&nbsp;" + String(Math.round(clickGain2Cost))
            upgradeInfoElement.innerHTML = "+&nbsp;" + String(clickGain2Up) + "&nbsp;Intuition per click."
        }    
        
    })
    clickGain2Element.addEventListener("mouseout", () => 
    {
        intuitionCostElement.innerHTML = ""
        upgradeInfoElement.innerHTML = ""
    })
    workerGain3Element.addEventListener("mouseover", () => 
    {
        if(upgradesOpen === true){
            intuitionCostElement.innerHTML = "&nbsp;-&nbsp;" + String(Math.round(workerGain3Cost))
            upgradeInfoElement.innerHTML = "Adds +&nbsp;" + String(workerGain3Up) + "&nbsp;to your passive Intuition gain."
        }    
        
    }) 
    workerGain3Element.addEventListener("mouseout", () => 
    {
        intuitionCostElement.innerHTML = ""
        upgradeInfoElement.innerHTML = ""
    }) 
    clickGain3Element.addEventListener("mouseover", () =>
    {
        if(upgradesOpen === true){
            intuitionCostElement.innerHTML = "&nbsp;-&nbsp;" + String(Math.round(clickGain3Cost))
            upgradeInfoElement.innerHTML = "+&nbsp;" + String(clickGain3Up) + "&nbsp;Intuition per click."
        }    
        
    })
    clickGain3Element.addEventListener("mouseout", () => 
    {
        intuitionCostElement.innerHTML = ""
        upgradeInfoElement.innerHTML = ""
    })
    broomElement.addEventListener("mouseover", () =>
    {
        if(upgradesOpen === true && broomHide === false){
            intuitionCostElement.innerHTML = "&nbsp;-&nbsp;" + String(Math.round(broomCost))
            upgradeInfoElement.innerHTML = "Good for sweeping."
        }    
        
    })
    broomElement.addEventListener("mouseout", () => 
    {
        intuitionCostElement.innerHTML = ""
        upgradeInfoElement.innerHTML = ""
    })
    stoneElement.addEventListener("mouseover", () =>
    {
        if(upgradesOpen === true && stoneCount <= 6){
            intuitionCostElement.innerHTML = "&nbsp;-&nbsp;" + String(Math.round(stoneCost))
            upgradeInfoElement.innerHTML = "A smooth and shiny white goban stone."
        }    
 
    })
    stoneElement.addEventListener("mouseout", () => 
    {
        intuitionCostElement.innerHTML = ""
        upgradeInfoElement.innerHTML = ""
    })
    coffeeElement.addEventListener("mouseover", () =>
    {
        if(upgradesOpen === true){
            intuitionCostElement.innerHTML = "&nbsp;-&nbsp;" + String(Math.round(coffeeCost))
            upgradeInfoElement.innerHTML = "2x Intuition per click for 1 minute"
        }    
        
    })
    coffeeElement.addEventListener("mouseout", () => 
    {
        intuitionCostElement.innerHTML = ""
        upgradeInfoElement.innerHTML = ""
    })
    hammerElement.addEventListener("mouseover", () =>
    {
        if(upgradesOpen === true){

        }    
        intuitionCostElement.innerHTML = "&nbsp;-&nbsp;" + String(Math.round(hammerCost))
        upgradeInfoElement.innerHTML = "A sturdy hammer."
    })
    hammerElement.addEventListener("mouseout", () => 
    {
        intuitionCostElement.innerHTML = ""
        upgradeInfoElement.innerHTML = ""
    })
    screwdriverElement.addEventListener("mouseover", () =>
    {
        if(upgradesOpen === true){

        }    
        intuitionCostElement.innerHTML = "&nbsp;-&nbsp;" + String(Math.round(screwdriverCost))
        upgradeInfoElement.innerHTML = "Unlock more secrets with more tools."
    })
    screwdriverElement.addEventListener("mouseout", () => 
    {
        intuitionCostElement.innerHTML = ""
        upgradeInfoElement.innerHTML = ""
    })
    wateringCanElement.addEventListener("mouseover", () =>
    {
        if(upgradesOpen === true){

        }    
        intuitionCostElement.innerHTML = "&nbsp;-&nbsp;" + String(Math.round(wateringCanCost))
        upgradeInfoElement.innerHTML = "Green your home."
    })
    wateringCanElement.addEventListener("mouseout", () => 
    {
        intuitionCostElement.innerHTML = ""
        upgradeInfoElement.innerHTML = ""
    })
    chiselElement.addEventListener("mouseover", () =>
    {
        if(upgradesOpen === true){

        }    
        intuitionCostElement.innerHTML = "&nbsp;-&nbsp;" + String(Math.round(chiselCost))
        upgradeInfoElement.innerHTML = "Tear away."
    })
    chiselElement.addEventListener("mouseout", () => 
    {
        intuitionCostElement.innerHTML = ""
        upgradeInfoElement.innerHTML = ""
    })
    drywallElement.addEventListener("mouseover", () =>
    {
        if(upgradesOpen === true){

        }    
        intuitionCostElement.innerHTML = "&nbsp;-&nbsp;" + String(Math.round(drywallCost))
        upgradeInfoElement.innerHTML = "Repair Away"
    })
    drywallElement.addEventListener("mouseout", () => 
    {
        intuitionCostElement.innerHTML = ""
        upgradeInfoElement.innerHTML = ""
    })
}

upgradeButtons()

//**********************************************************************

//------------------------------Renderer--------------------------------

//**********************************************************************

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: false
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.outputEncoding = THREE.sRGBEncoding

//**********************************************************************

//---------------------------------Animate-------------------------------

//**********************************************************************

const clock = new THREE.Clock()

let tickValue = 1

let previousTime = 0

let josekiTimerStart = false
let josekiTimer = 0
let yourTurn = true

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    

    // Update Animation Mixer
    if(mixer2 !== null && mixer !== null && mixer3 !== null && mixer4 !== null && mixer5 !== null && mixer6 != null && mixer7 !== null)
    {
        mixer.update(deltaTime)
        mixer2.update(deltaTime)
        mixer3.update(deltaTime)
        mixer4.update(deltaTime)
        mixer5.update(deltaTime)
        mixer6.update(deltaTime)
        mixer7.update(deltaTime)
    }

    currentStage = stagePicker

    //  true tick value
    if(elapsedTime >= tickValue)
    {
        tickValue += 1
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
        if(josekiTimerStart === true)
        {
            josekiTimer +=1
            console.log(josekiTimer)
            if(josekiTimer >= 100)
            {
                josekiTimerStart = false
                joseki[josekiState].visible = false
                josekiState += 1
                joseki[josekiState].visible = true
                yourTurn = true
                josekiTimer = 0
                notificationElement.innerHTML = "A distant click from the go board."
                stoneSound.play()
                if(josekiState >= 12)
                {
                    goBoardState.splice(0,1,1)
                }
            }
        }
    }    
    
    //TaskBar Update
    taskFillElement.style.width = 
    ((eval(currentStage + 'State')[3] / 
    eval(currentStage + 'State')[2]) * 100)
    .toString() + "%"

    taskCurrentCount = eval(currentStage + 'State')[3]
    eval(currentStage + 'State').splice( 3, 1, taskCurrentCount )
    if(eval(currentStage + 'State')[3] > eval(currentStage + 'State')[2])
    {
        taskFillElement.style.width = "100%"
    }

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