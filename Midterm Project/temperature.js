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
        document.getElementById('temperature-form').addEventListener('submit', function (e) {
          e.preventDefault();
  
          // Get user input
          const inputValue = parseFloat(document.getElementById('input-value').value);
          const selectedConversionType = conversionTypeSelect.value;
  
          // Perform the conversion based on the selected type
          let result;
          if (selectedConversionType === 'celsiusToFahrenheit') {
            result = (inputValue * 9/5) + 32;
          } else if (selectedConversionType === 'fahrenheitToKelvin') {
            result = (inputValue - 32) * 5/9 + 273.15;
          } else if (selectedConversionType === 'fahrenheitToCelsius') {
            result = (inputValue - 32) / 1.8;
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
  
  