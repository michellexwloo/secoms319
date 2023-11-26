document.addEventListener('DOMContentLoaded', function () {
    // Load JSON data
    fetch('data.json')
      .then(response => response.json())
      .then(data => {
        // Handle data to display images and texts
        const conversionTypeSelect = document.getElementById('conversion-type');
        const formulaImage = document.getElementById('formula-image').querySelector('img');
        const convertedValueSpan = document.getElementById('converted-value');
  
        // Handle form submission and conversion logic
        document.getElementById('time-form').addEventListener('submit', function (e) {
          e.preventDefault();
  
          // Get user input
          const inputValue = parseFloat(document.getElementById('input-value').value);
          const selectedConversionType = conversionTypeSelect.value;
  
          // Perform the conversion based on the selected type
          let result;
          if (selectedConversionType === 'hourToMinute') {
            result = inputValue * 60;
          } else if (selectedConversionType === 'hourToSecond') {
            result = inputValue * 3600;
          } else if (selectedConversionType === 'minuteToSecond') {
            result = inputValue * 60;
          } else if (selectedConversionType === 'secondToHour') {
            result = inputValue / 3600;
          } else if (selectedConversionType === 'secondToMinute') {
            result = inputValue / 60;
          }
  
          // Display the result
          convertedValueSpan.textContent = result;
  
          // Display the corresponding image and text based on the selected type
          const selectedConversionData = data.find(item => item.id === selectedConversionType);
          formulaImage.src = selectedConversionData.imagePath; // Set the image source
          formulaImage.alt = "Conversion Formula";
  
          // Display the corresponding text
          document.getElementById('formula-text').textContent = selectedConversionData.text;
          document.getElementById('formula-text2').textContent = selectedConversionData.formula;
        });
      });
  });