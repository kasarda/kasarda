/**
 * 
 * @module react
 * 
 * Includes refference to @var React and @var ReactDOM
 * Includes @const Component and @const Render constants to pass correctly ts checking
 * This module includes Hash routing components
 */

import * as React from 'react'
import * as ReactDOM from 'react-dom'


/**
 * 
 * Component function with success ts check
 * 
 */
type component = new (props?: any, context?: any, updater?: any) => any
export const Component: component = React.Component


/**
 * 
 * Render function with success ts check
 * 
 */

export const Render: (template: any, element: HTMLElement, callback?: () => void) => any = ReactDOM.render


/**
 * 
 * Export dependencies
 * 
 */
export { React }
export { ReactDOM }




/**
 * 
 * HashRouting
 * 
 */


function getHash(): string {
    return location.hash.replace('#', '')
}

function isValidPath(path: any): any{
    return (typeof path === 'string' && getHash() === path) || (path instanceof RegExp && getHash().match(path))
}

export class Router {

    constructor(scope: any) {
        scope.state = scope.state || {}
        scope.state.path = getHash()
        onhashchange = e => {
            scope.setState({ path: getHash() })
            if (typeof scope.onHashChange === 'function')
                scope.onHashChange.call(scope, getHash(), e)
        }
    }


    static getHash: () => string = getHash

    static redirect(hash: any, redirectTo?: string): void {
        if (typeof redirectTo === 'string' && isValidPath(hash))
            location.hash = redirectTo
        else if(typeof hash === 'string')
            location.hash = hash
    }
    

    static render(templates: any[], notFound: any): any {
        let template: any
        templates.forEach(temp => {            
            if (!template && isValidPath(temp.props.path) )
                template = temp
        })

        return template || notFound
    }

}






export class Routes extends Component{

    render(){
        const children: any = this.props.children
        const childs: any[] = children instanceof Array ? children : [children]
        const notFound: any[] = children.filter(temp => temp.props.notFound)
        return (
            <outlet-component>
                {Router.render(childs, notFound)}
            </outlet-component>
        )
    }
}


export class Link extends Component {
    render(){
        let className: string = ''
        const def_className: string = 'active'

        if (isValidPath(this.props.path) )
            className = this.props.active || def_className
        
        return (
            <hash-link class={className}>
                {this.props.children}
            </hash-link>
        )
    }
}


/**
 * 
 * @name HashRouting
 * 
 * import {..., Router, Routes, Link}
 * 
 * class AppComponent extends Component{
 *  constructor(){
 *      ...
 *      new Router(this) -> create event listener on hash change, update this.state.path on every hash change and trigger method onHashChange
 *  }
 * 
 *  onHashChange(newHash, event){
 *   -> 'this' is AppComponent not Window
 * }
 * 
 * render(){
 *  Router.redirect('home', '') -> if hash will be home, location will be updated to '' hash
 * 
 *  return (
 *      <div id="app">
 *          
 *          <Routes>
 *              <Home path={/^home|main|$/}/>
 *              <About path='about'/>
 *              <NotFound notFound />
 *          <Routes/>
 * 
 *       
 *          <Link path={/^(home|)$/}><a href="#home"> Home </a></Link>
 *          <Link path="about" active="someDifClass"><a href="#about"> About </a></Link>
 *          <Link path="contact"><a href="#contact"> Contact </a></Link>
 *          
 *          -> if [path] match location.hash this link will be has class from [active] or by default .active
 *  
 *      </div>
 *  )
 * }
 * }
 * 
 */