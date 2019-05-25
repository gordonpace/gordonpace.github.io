
function show(id) {
    document.getElementById(id).classList.remove('offscreen')
    document.getElementById(id).classList.add('onscreen')
}

function unshow(id) {
    document.getElementById(id).classList.remove('onscreen')
    document.getElementById(id).classList.add('offscreen')
}

function simpleAction(action) {
    return (((_action) => {
        return (
            function (next) {
                return (
                    ((_next) => {
                        return {
                            run: () => {
                                _action()
                                _next.run()
                            }
                        }
                    })(next)
                )        
            }
        )
        })(action))
}

function simpleAction1(action) {
    return ((_action) => {
        return (
            function (parameter) {
                return ((_parameter) => {
                    return (function (next) {
                        return (
                            ((_next) => {
                                return {
                                    run: () => {
                                        _action(_parameter)
                                        _next.run()
                                    }
                                }
                            })(next)
                        )
                    })
                })(parameter)
            }
        )
    })(action)
}

/* Animation functions: Header */
var showHeader = simpleAction(() => { show('header-bar') })
var unshowHeader = simpleAction(() => { unshow('header-bar') })

/* Animation functions: Background text */
var showMessage = simpleAction(() => { show('background-message') })
var unshowMessage = simpleAction(() => { unshow('background-message') })
var setMessage = simpleAction1((text) => { document.getElementById('background-message-text').innerText = text })

/* Animation functions: Background image */
var changeBackgroundImage = 
    simpleAction1((image) => { 
        document.getElementById('background-image').style.backgroundImage = "url('"+image+"')" 
    })

/* Animation functions: About us pane */
var openAboutUsSlideoutPage = simpleAction(() => {
    show('about-us-slider-drawer')
    show('about-us-slider-drawer-background-overlay')
})
var closeAboutUsSlideoutPage = simpleAction(() => {
    unshow('about-us-slider-drawer')
    unshow('about-us-slider-drawer-background-overlay')
})

/* Animation functions: Our app pane */
var openOurAppSlideoutPage = simpleAction(() => {
    show('our-app-slider-drawer')
    show('our-app-slider-drawer-background-overlay')
})
var closeOurAppSlideoutPage = simpleAction(() => {
    unshow('our-app-slider-drawer')
    unshow('our-app-slider-drawer-background-overlay')
})

/* Animation functions: Basic actions */
function delay(delta) {
    return ((_delta) => {
        return (
            function (next) {
                return (
                    (_next) => {
                        return {
                            run: () => {
                                setTimeout(_next.run, _delta)
                            }
                        }
                    }
                )(next)
            }
        )
    })(delta)
}
function goto(f) {
    return {
        run: () => { f().run() }
    }
}
function done() {
    return {
        run: () => {}
    }
}

/* Compound actions */

function backgroundAnimation() {
    return (
        changeBackgroundImage('images/background-1.jpg')(
        setMessage('Smart browsing of Maltese legislation')(
        showMessage(
        delay(5000)(
        unshowMessage(
        delay(2000)(
        changeBackgroundImage('images/background-2.jpg')(
        setMessage('The law at your fingertips')(
        showMessage(
        delay(5000)(
        unshowMessage(
        delay(2000)(
        goto(backgroundAnimation)
        )))))))))))) // This is not LISP
    )
}


/* Access functions for html page */

function openAboutUsPage() {
    return (
        openAboutUsSlideoutPage(
        unshowHeader(
        done(
        )))
    )
}
function closeAboutUsPage() {
    return (
        closeAboutUsSlideoutPage(
        showHeader(
        done(
        )))
    )
}
function openOurAppPage() {
    return (
        openOurAppSlideoutPage(
        unshowHeader(
        done(
        )))
    )
}
function closeOurAppPage() {
    return (
        closeOurAppSlideoutPage(
        showHeader(
        done(
        )))
    )
}
function pageInitialisation() {
    return (
        showHeader(
        backgroundAnimation(
        ))
    )
}
