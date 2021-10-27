import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { gsap } from 'gsap'

/**
 * ----------------------------------Base-------------------------------------
 */

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * --------------------LOADERS, MODELS, ANIMATIONS---------------------------
 */

// Animations
let mixer = null
let mixer2 = null
let mainDoorAction = null
let computerDoorAction = null

// Models
const gltfLoader = new GLTFLoader()

let dishes = [0,1,2,3,4,5,6]

let rug = [0,1]
let book = [0,1]

gltfLoader.load(
    '/Assets/gltf/LivingHouse.gltf',
    (gltf) =>
    {
        scene.add(gltf.scene)
    }
)
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
// gltfLoader.load(
//     'Assets/gltf/boards.gltf',
//     (gltf) =>
//     {
//         scene.add(gltf.scene)
//     }
// )
gltfLoader.load(
    'Assets/gltf/chair.gltf',
    (gltf) =>
    {
        scene.add(gltf.scene)
    }
)
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
gltfLoader.load(
    'Assets/gltf/rug.gltf',
    (gltf) =>
    {
        rug[0] = gltf.scene
        scene.add(rug[0])
    }
)
gltfLoader.load(
    'Assets/gltf/bookState1.gltf',
    (gltf) =>
    {
        book[0] = gltf.scene
        scene.add(book[0])
    }
)
gltfLoader.load(
    'Assets/gltf/bookState2.gltf',
    (gltf) =>
    {
        book[1] = gltf.scene
        scene.add(book[1])
    }
)


/**
 * -----------------------------IDLE COMPONENT------------------------
 */

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
let sinkState = [0,0,1000,0,0]
let computerRoomState = [0,0,0,0,0]
let deskState = [0,0,5000,0,0]
let bathroomState = [0,0,200,0,0]
let keepingRoomState = [0,0,50000,0,0]
let backRoomState = [0,0,0,0,0]
let freeRoamState = [1,0,0,0,0]

/**
 * The last item within each stage array is 'taskStageProgress'.
 * This item counts the total amount of timed events, and is 
 * updated according to the amount of items within the
 * 'stageTimedEvenets' Array. The timed events are triggered in
 * order when the number of clicks matches the item.
 */

let defaultTimedEvents = [1]
let sinkTimedEvents = [20,80,150,300,600,800,1000]
let computerRoomTimedEvents = [10]
let freeRoamTimedEvents = [1]

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
let clickingEnabled = false

document.getElementById("clicker").addEventListener("click", () =>
{
    if (clickingEnabled === true)
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
        document.getElementById("intuition").innerHTML = Math.round(intuition)
        //Check if task is finished
        if(eval(currentStage + 'State')[2] == eval(currentStage + 'State')[3])
        {
            //Add the 'Completed' state (1) to stageState array
            eval(currentStage + 'State').splice( 1, 1, 1 )
        }
        console.log(eval(currentStage + 'State'))
    }
})
//   WORKER
let workerCountUp = 0

/**
 * ---------------------------SOUNDS---------------------------------
 */

const listener = new THREE.AudioListener();
const windowSound = new THREE.PositionalAudio( listener );
const audioLoader = new THREE.AudioLoader();
audioLoader.load( 
    '/Assets/ogg/windowAmbience.ogg',
    (buffer) =>
    {
        windowSound.setBuffer( buffer )
        windowSound.setRefDistance( 5 )
        windowSound.play()
    })


/**
 * -------------------------TIMED EVENTS-----------------------------
 */

 const sinkEvent0 = () =>
 {
    dishes[0].visible = false
    dishes[1].visible = true
    document.getElementById("notification").innerHTML = "You found a key..."
    document.getElementById("inventory").classList.add('show')
    document.getElementById("key1").classList.add("show")
 }
 const sinkEvent1 = () =>
 {
     dishes[1].visible = false
     dishes[2].visible = true
 }
 const sinkEvent2 = () =>
 {
     dishes[2].visible = false
     dishes[3].visible = true
 }
 const sinkEvent3 = () =>
 {
     dishes[3].visible = false
     dishes[4].visible = true
 }
 const sinkEvent4 = () =>
 {
     dishes[4].visible = false
     dishes[5].visible = true
 }
 const sinkEvent5 = () =>
 {
     dishes[5].visible = false
     dishes[6].visible = true
 }

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#ffffff', 0.5)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#ffffff', 0.5)
moonLight.position.set(4, 5, - 2)
scene.add(moonLight)

/**
 * Sizes
 */
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

/**
 * --------------------------Camera----------------------------------
 */

// Base camera
const camera = new THREE.PerspectiveCamera(65, sizes.width / sizes.height, 0.1, 100)
camera.position.y = 1.6
camera.position.z = 3
camera.position.x = 6.1
camera.add( listener )
scene.add(camera)

// Camera LookAt Object
let cameraRotation = {x:Math.PI}

const lookAtGeometry = new THREE.BoxGeometry(0.01,0.01,0.01)
const lookAtMaterial = new THREE.MeshBasicMaterial({color: 0x000000})
const lookAtObject = new THREE.Mesh(lookAtGeometry, lookAtMaterial)
lookAtObject.visible = false
scene.add(lookAtObject)
lookAtObject.position.y = 1.6

const speakerGeo = new THREE.SphereGeometry(0.2,8,8)
const speakerMat = new THREE.MeshBasicMaterial({ color: 0xffffff, visible: false })
const windowSpeaker = new THREE.Mesh( speakerGeo, speakerMat )
scene.add( windowSpeaker )
windowSpeaker.position.set(-1,1.4,9)

windowSpeaker.add( windowSound )

//  TOGGLE BETWEEN 'FIXED' AND 'FREE ROAM'
let freeRoam = false

// First Person Controls

// ENABLE ORBIT CONTROLS HERE
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * ---------------------GSAP Animations---------------------------
 */
const enter = () =>
{

    gsap.to(camera.position, { x: 5, duration: 0.5 })
    gsap.to(camera.position, { x: 4, delay: 1, duration: 0.5 })
    gsap.to(camera.position, { x: 3, delay: 2, duration: 0.5 })
    gsap.to(camera.position, { x: -1, delay: 3, duration: 1 })
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
const sinkToBathroom = () =>
{
    gsap.to(lookAtObject.position, {y: 1.6, duration: 1})
    gsap.to(cameraRotation, {x: Math.PI * 1.5, duration: 1})
    gsap.to(camera.position, {x: 0, z: 3, duration: 1})
}
const computerDoorToSink = () =>
{
    gsap.to(cameraRotation, {x: Math.PI * 0.5, duration: 2})
    gsap.to(lookAtObject.position, {y: 1.1, duration: 2})
    gsap.to(camera.position, {x: -1.5, z: 5.5, y: 1.6, duration: 2})
}
const livingRoomToDesk = () =>
{
    gsap.to(cameraRotation, {x: Math.PI, duration: 1})
    gsap.to(lookAtObject.position, {y: 1.6, duration: 1})
    gsap.to(camera.position, {x: -1.5, z: 5.5, duration: 1})
    gsap.to(camera.position, {x: -3.5, delay: 1, duration: 1})
    gsap.to(camera.position, {z: 5.8, delay: 1, duration: 1})
    gsap.to(lookAtObject.position, {y: 1.3, delay: 1, duration: 1})
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
}

/**
 *  ---------------------HTML EVENT LISTENERS--------------------------
 */
// NAVIGATION

document.getElementById("enterButton").addEventListener("click", () =>
{
    if(defaultState[0] === 1)
    {
        enter()
        mainDoorAction.play()
        sinkState.splice( 0, 1, 1 )
        defaultState.splice( 0, 1, 0, )
        document.getElementById("enterButton").classList.remove('show')
        document.getElementById("deskButton").classList.add('show')
        document.getElementById("bathroomButton").classList.add('show')
        document.getElementById("computerRoomButton").classList.add('show')
        document.getElementById("sinkButton").classList.add('show')
        document.getElementById("currentRoom").classList.add('show')
        document.getElementById("currentRoom").innerHTML = "CURRENT ROOM:<br>Living Room"
        document.getElementById("keepingRoomButton").classList.add('show')
        document.getElementById("backDoorButton").classList.add('show')
        document.getElementById("freeRoamButton").classList.add('show')
    }
    else if(defaultState[0] === 2)
    {
        exitComputerRoom()
        document.getElementById("enterButton").classList.remove('show')
        document.getElementById("deskButton").classList.add('show')
        document.getElementById("bathroomButton").classList.add('show')
        document.getElementById("computerRoomButton").classList.add('show')
        document.getElementById("sinkButton").classList.add('show')
        document.getElementById("upgrades").classList.remove('show')
    }

})
document.getElementById("sinkButton").addEventListener("click", () =>
{
    if(sinkState[0] === 1)
    {
        document.getElementById("currentTask").classList.add('show')
        document.getElementById("currentTask").innerHTML = "CURRENT TASK:<br>Dishes"
        document.getElementById("clicker").innerHTML = "Wash Dishes"
        document.getElementById("clicker").classList.add('show')
        document.getElementById("taskbar").classList.add('show')
        stagePicker = 'sink'
        clickingEnabled = true
        computerDoorToSink()
        console.log(sinkState)
    }
})
document.getElementById("computerRoomButton").addEventListener("click", () =>
{
    if(computerRoomState[0] === 0)
    {
        stagePicker = 'computerRoom'
        toComputerDoorLocked()
        document.getElementById("currentTask").innerHTML = "CURRENT TASK:<br>None"
        document.getElementById("clicker").classList.remove('show')
        document.getElementById("taskbar").classList.remove('show')
    }
    else if(computerRoomState[0] === 1)
    {
        stagePicker = 'computerRoom'
        toComputerDoorUnlocked()
        document.getElementById("currentRoom").innerHTML = "CURRENT ROOM:<br>Computer Room"
        document.getElementById("sinkButton").classList.remove("show")
        document.getElementById("bathroomButton").classList.remove("show")
        document.getElementById("computerRoomButton").classList.remove("show")
        document.getElementById("deskButton").classList.remove("show")
        document.getElementById("enterButton").classList.add("show")
        document.getElementById("upgrades").classList.add("show")
        document.getElementById("enterButton").classList.add("show")
        document.getElementById("clicker").classList.remove('show')
        document.getElementById("taskbar").classList.remove('show')
    }
    console.log(computerRoomState)
})
document.getElementById("bathroomButton").addEventListener("click", () => 
{
    if(bathroomState[0] === 0)
    {
        stagePicker = 'default'
        sinkToBathroom()
        document.getElementById("currentTask").innerHTML = "CURRENT TASK:<br>None"
        document.getElementById("clicker").classList.remove('show')
        document.getElementById("taskbar").classList.remove('show')
    }
    else if(bathroomState[0] === 1)
    {
        sinkToBathroom()
        stagePicker = 'bathroom'
        document.getElementById("clicker").classList.add('show')
        document.getElementById("taskbar").classList.add('show')
    }
    // easy menu
    // document.getElementById("upgrades").classList.add("show")
})
document.getElementById("deskButton").addEventListener("click", () => 
{
    if(deskState[0] === 0)
    {
        stagePicker = 'default'
        livingRoomToDesk()
        document.getElementById("currentTask").innerHTML = "CURRENT TASK:<br>None"
        document.getElementById("clicker").classList.remove('show')
        document.getElementById("taskbar").classList.remove('show')
    }    
    else if(deskState[0] === 1)
    {
        stagePicker = 'desk'
        livingRoomToDesk()
        document.getElementById("clicker").classList.add('show')
        document.getElementById("taskbar").classList.add('show')
    }
})
document.getElementById("keepingRoomButton").addEventListener('click', () =>
{
    if(keepingRoomState[0] === 0)
    {
        stagePicker = 'default'
        toKeepingRoom()
    }
    else if(keepingRoomState[0] === 1)
    {
        stagePicker = 'keepingRoom'
    }
})
document.getElementById("backDoorButton").addEventListener('click', () =>
{
    if(backRoomState[0] === 0)
    {
        stagePicker = 'default'
        toBackDoor()
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

// INVENTORY

document.getElementById("key1").addEventListener("click", () =>
{
    if(currentStage === 'computerRoom')
    {
        document.getElementById("notification").innerHTML = "You unlocked the computer room door."
        document.getElementById("key1").classList.remove("show")
        computerRoomState.splice(0,1,1)
        computerDoorAction.play()
        defaultState.splice(0,1,2)
        document.getElementById("currentRoom").innerHTML = "CURRENT ROOM:<br>Computer Room"
        document.getElementById("enterButton").innerHTML = "Exit"
        document.getElementById("sinkButton").classList.remove("show")
        document.getElementById("bathroomButton").classList.remove("show")
        document.getElementById("computerRoomButton").classList.remove("show")
        document.getElementById("deskButton").classList.remove("show")
        document.getElementById("enterButton").classList.add("show")
        document.getElementById("upgrades").classList.add("show")
        toComputerDoorJustUnlocked()
    }
    else
    {
        document.getElementById("notification").innerHTML = "This key cannot be used here."
    }
})

// UPGRADES

let intuitionGainCost = 50
let intuitionGainUp = 1
let clickGainCost = 50
let clickCountUp = 1

document.getElementById("workerGain").addEventListener("click", () =>
{
    if(intuition >= intuitionGainCost)
    {
        intuition -= intuitionGainCost
        workerCountUp += intuitionGainUp
        intuitionGainUp *= 1.5
        intuitionGainCost *= 2
        console.log("bought worker")
        document.getElementById("workerGain").innerHTML = "Passive Intuition Gain: " + String(Math.round(intuitionGainCost))
    }
    else
    {
        document.getElementById("notification").innerHTML = "Not enough intuition..."
        console.log("cannot afford")
    }
    document.getElementById("intuition").innerHTML = intuition
})
document.getElementById("clickGain").addEventListener("click", () =>
{
    if(intuition >= clickGainCost)
    {
        intuition -= clickGainCost
        clickCountUp += 1
        clickGainCost *= 2
        console.log("bought Click")
        document.getElementById("clickGain").innerHTLM = "Intuition Click Gain: " + String(Math.round(clickGainCost))
    }
    else
    {
        document.getElementById("notification").innerHTML = "Not enough intuition..."
        console.log("cannot afford")
    }
    document.getElementById("intuition").innerHTML = intuition
})

/**
 * ----------------------First Person Controls----------------------------
 */

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


/**
 * -------------------------------Renderer--------------------------------
 */

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: false
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.outputEncoding = THREE.sRGBEncoding

/**
 * ---------------------------------Animate-------------------------------
 */
const clock = new THREE.Clock()

let tickValue = 1

let previousTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // ENABLE ORBIT CONTROLS HERE
    // Update controls
    // controls.update()

    /**
     * IDLE TICK FUNCTION
     */

    // Update Animation Mixer
    if(mixer2 !== null && mixer !== null)
    {
        mixer.update(deltaTime)
        mixer2.update(deltaTime)
    }

    currentStage = stagePicker

    //  true tick value
    if(elapsedTime >= tickValue)
    {
        tickValue += 1

        //Count Up Actions
        intuition += workerCountUp
        taskCurrentCount += workerCountUp
        if(eval(currentStage + 'State')[2] > 0)
        {
            eval(currentStage + 'State').splice(3, 1, taskCurrentCount)
        }
        document.getElementById("intuition").innerHTML = Math.round(intuition)
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
    document.getElementById("taskFill").style.width = 
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
    if(eval(currentStage + 'State')[3] === eval(currentStage + 'TimedEvents')[eval(currentStage + 'State')[4]])
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