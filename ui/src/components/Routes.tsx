import { Test } from 'pages/Test';
import { useRef } from 'react';
import { Routes as RouterRoutes, Route, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export const Routes = () => {
  const location = useLocation();
  const nodeRef = useRef(null);

  return (
    <TransitionGroup>
      <CSSTransition
        timeout={300}
        classNames="fade"
        key={location.key}
        nodeRef={nodeRef}
      >
        <div ref={nodeRef}>
          <RouterRoutes location={location}>
            <Route path="/test" element={<Test />} />
          </RouterRoutes>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
};
