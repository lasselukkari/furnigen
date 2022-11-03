import React from 'react'
import { Route } from 'react-router-dom'

import TableGenerator from './TableGenerator'


export const routes = [
  { path: '/basics',
    component: TableGenerator,
    title: 'Basics',
    file: '1.Basics.js',
    desc: 'Basics Routing example'
  },
  { path: '/url-param',
    component: UrlParams,
    title: 'Url Parameters',
    file: '2.UrlParameters.js',
    desc: 'Passing Url parameters '
  },
  { path: '/custom-link',
    component: CustomLink,
    title: 'Custom Link',
    file: '4.CustomLink.js',
    desc: 'Customized link style'
  },
  { path: '/redirect-auth',
    component: RedirectsAuth,
    title: 'Redirects (Auth)',
    file: '3.RedirectsAuth.js',
    desc: 'Redirecting to authenticate'
  },
  { path: '/prev-trans',
    component: PreventTransition,
    title: 'Prevent Transition',
    file: '5.PreventTransition.js',
    desc: 'A way to avoid transitions'
  },
  { path: '/no-match',
    component: NoMatch404,
    title: 'No Match 404',
    file: '6.NoMatch404.js',
    desc: 'Handling case of no match/404'
  },
  { path: '/rec-link',
    component: RecursiveLink,
    title: 'Recursive Link',
    file: '7.RecursiveLink.js',
    desc: 'A way to use recursively renders following link'
  },
  { path: '/sidebar',
    component: SideBar,
    title: 'Sidebar',
    file: '8.SideBar.js',
    desc: 'Rendering in main and side bar'
  },
  { path: '/animated',
    component: AnimatedTransition,
    title: 'Animated Transition',
    file: '9.AnimatedTransition.js',
    desc: 'Animates transition using package react-transition-group'
  },
  { path: '/ambiguous',
    component: AmbiguousMatch,
    title: 'Ambiguous Match',
    file: '10.AmbiguousMatch.js',
    desc: 'Ambiguous match'
  },
  { path: '/route-config',
    component: RouteConfig,
    title: 'Route Config',
    file: '11.RouteConfig.js',
    desc: 'React routes can be created from config'
  },
  { path: '/modal-gallery',
    component: ModalGallery,
    title: 'Modal Gallery',
    file: '12.ModalGallery.js',
    desc: 'Modal gallery, two screens at one url'
  },
  { path: '/static-router',
    component: StaticRouter,
    title: 'Static Router',
    file: '13.StaticRouter.js',
    desc: 'Static router example'
  }
]

const Routes = () => (
  <div>
    {routes.map((route, index) => (
      <Route path={route.path} key={index}
        render={(props) => (
          <div>
            <div className='thumbnail' style={{padding: '20px'}}>
            <route.component {...props}/>
            </div>     
            <CodeSnippet fileName={route.file}/>
          </div>
        )}
      />
    ))}
    <Route exact path='/' render={() => (
      <div>
        <p>Current path is exactly matched with <code>/</code></p>
        <p>Choose examples from right</p>
      </div>
    )}/>
  </div>
)

export default Routes