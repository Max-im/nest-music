import React from 'react';
import MainLayout from '../layouts/MainLayout';

function Index() {
  return (
    <>
      <MainLayout>
        <div className="center">Index</div>
      </MainLayout>

        <style jsx>
          {`
            .center {
              margin: 150px 0 0 0;
              display: flex;
              flex-direction: column;
              align-items: center;
            }
          `}
        </style>
    </>
  );
}

export default Index;
