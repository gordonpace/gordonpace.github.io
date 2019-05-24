/* Animation functions: Header and footer */

function showBars(next) {
    return (
        showFooter(
            showHeader(
                next
            )
        )
    )
}

function unshowBars(next) {
    return (
        unshowFooter(
            unshowHeader(
                next
            )
        )
    )
}


function unshowFooter(next) {
    return(
        ((_next) => {
            return {
                run: () => {
                    var cs = document.getElementById('footer-bar').classList
                    cs.remove('onscreen')
                    cs.add('offscreen')
                    _next.run()
                }
            }
        })(next)
    )
}

function showFooter(next) {
    return (
        ((_next) => {
            return {
                run: () => {
                    var cs = document.getElementById('footer-bar').classList
                    cs.remove('offscreen')
                    cs.add('onscreen')
                    _next.run()
                }
            }
        })(next)
    )
}

function unshowHeader(next) {
    return (
        ((_next) => {
            return {
                run: () => {
                    document.getElementById('header-bar').className = 'offscreen'
                    _next.run()
                }
            }
        })(next)
    )
}
function showHeader(next) {
    return (
        ((_next) => {
            return {
                run: () => {
                    document.getElementById('header-bar').className = 'onscreen'
                    _next.run()
                }
            }
        })(next)
    )
}

/* Animation functions: Background text */

function showMessage(next) {
    return (
        ((_next) => {
            return {
                run: () => { 
                    document.getElementById('background-message').className = 'onscreen' 
                    _next.run()
                }
            }
        })(next)
    )
}
function unshowMessage(next) {
    return (
        ((_next) => {
            return {
                run: () => { 
                    document.getElementById('background-message').className = 'offscreen'
                    _next.run()
                }
            }
        })(next)
    )
}
function setMessage(text, next) {
    return (
        ((_text, _next) => {
            return {
                run: () => { 
                    document.getElementById('background-message-text').innerText = text
                    _next.run()
                }
            }
        })(text, next)
    )
}

/* Animation functions: Background image */

function changeBackgroundImage(image, next) {
    return (
        ((_image, _next) => {
            return {
                run: () => { 
                    document.getElementById('background-image').style.backgroundImage = "url('"+_image+"')"
                    _next.run()
                }
            }
        })(image, next)
    )
}

/* Animation functions: About us pane */

function openAboutUsSlideoutPage(next) {
    return (
        ((_next) => {
            return {
                run: () => {
                    document.getElementById('about-us-slider-drawer').className = 'onscreen'
                    document.getElementById('about-us-slider-drawer-background-overlay').className = 'onscreen'
                    _next.run()
                }
            }
        })(next)
    )
}
function closeAboutUsSlideoutPage(next) {
    return (
        ((_next) => {
            return {
                run: () => {
                    document.getElementById('about-us-slider-drawer').className = 'offscreen'
                    document.getElementById('about-us-slider-drawer-background-overlay').className = 'offscreen'
                    _next.run()
                }
            }
        })(next)
    )
}


/* Animation functions: Our app pane */

function openOurAppSlideoutPage(next) {
    return (
        ((_next) => {
            return {
                run: () => {
                    document.getElementById('our-app-slider-drawer').className = 'onscreen'
                    document.getElementById('our-app-slider-drawer-background-overlay').className = 'onscreen'
                    _next.run()
                }
            }
        })(next)
    )
}
function closeOurAppSlideoutPage(next) {
    return (
        ((_next) => {
            return {
                run: () => {
                    document.getElementById('our-app-slider-drawer').className = 'offscreen'
                    document.getElementById('our-app-slider-drawer-background-overlay').className = 'offscreen'
                    _next.run()
                }
            }
        })(next)
    )
}

/* Animation functions: General */

function delay(delta, next) {
    return (
        ((_delta, _next) => {
            return {
                run: () => {
                    setTimeout(_next.run, _delta)
                }
            }
        })(delta, next)
    )
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
        changeBackgroundImage('images/background-1.jpg',
        setMessage('Smart browsing of Maltese legislation',
        showMessage(
        delay(5000,
        unshowMessage(
        delay(2000,
        changeBackgroundImage('images/background-2.jpg',
        setMessage('The law at your fingertips',
        showMessage(
        delay(5000,
        unshowMessage(
        delay(2000,
        goto(backgroundAnimation)
        ))))))))))))
    )
}


/* Access functions for html page */

function openAboutUsPage() {
    openAboutUsSlideoutPage(
        unshowBars(
            done()
        )
    ).run()
}
function closeAboutUsPage() {
    closeAboutUsSlideoutPage(
        showBars(
            done()
        )
    ).run()
}
function openOurAppPage() {
    openOurAppSlideoutPage(
        unshowBars(
            done()
        )
    ).run()
}
function closeOurAppPage() {
    closeOurAppSlideoutPage(
        showBars(
            done()
        )
    ).run()
}

function pageInitialisation() {
    showBars(
        backgroundAnimation()
    ).run()
}
