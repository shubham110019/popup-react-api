import React, { useEffect, useState } from 'react';

const PopupComponent = ({ userId }) => {
  const [popups, setPopups] = useState([]);
  const [initializedPopups, setInitializedPopups] = useState(new Set()); // Track initialized popups

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:9000/api/modal-data/${userId}`);
        const result = await response.json();

        if (Array.isArray(result)) {
          setPopups(result);
        } else {
          setPopups([result]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userId]);

  const initializePopup = (popup) => {
    const popupId = popup.popid;

    // Check if this popup has already been initialized
    if (!initializedPopups.has(popupId)) {
      // Mark this popup as initialized
      setInitializedPopups((prev) => new Set(prev).add(popupId));

      // Create the popup div
      const popupDiv = document.createElement('div');
      popupDiv.id = `om-${popupId}`;
      popupDiv.className = 'om-canva-web';
    //   popupDiv.style.display = 'flex';

      // Inject HTML content
      const contentDiv = document.createElement('div');
      contentDiv.innerHTML = popup.html;
      popupDiv.appendChild(contentDiv);

      // Inject CSS if available
      if (popup.css) {
        const style = document.createElement('style');
        style.innerHTML = popup.css;
        popupDiv.appendChild(style); // Append CSS to the popup
      }

      // Inject JS if available
      if (popup.js) {
        const script = document.createElement('script');
        script.innerHTML = popup.js;
        popupDiv.appendChild(script); // Append JS to the popup
      }

      // Add close button functionality
      const closeButton = contentDiv.querySelector(`#om-${popupId} .close-btn`);
      if (closeButton) {
        closeButton.addEventListener('click', () => {
          popupDiv.style.display = 'none'; // Hide the popup when close button is clicked
        });
      }

      // Append the popup to the document body
      document.body.appendChild(popupDiv);
    }
  };

  useEffect(() => {
    popups.forEach((popup) => {
      initializePopup(popup);
    });
  }, [popups]);

  return (
    <>
      {popups.length > 0 ? (
        <></>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default PopupComponent;
