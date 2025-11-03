/**
 * Gets the user input from the flavor input field
 * @returns {string} The trimmed input value
 */
function getUserInput() {
    return document.getElementById('flavors').value.trim();
}

/**
 * Parses a string of comma-separated flavors into an array
 * @param {string} input - The input string containing comma-separated flavors
 * @returns {string[]} An array of trimmed, lowercase flavors
 * @throws {Error} If the input is empty or contains only empty values
 */
function parseFlavors(input) {
    if (!input) {
        throw new Error('Please enter at least one flavor');
    }

    const flavors = input.split(',')
        .map(flavor => flavor.trim())
        .filter(flavor => flavor !== '');

    if (flavors.length === 0) {
        throw new Error('Please enter valid flavors (not just commas)');
    }

    return flavors.map(flavor => flavor.toLowerCase());
}

/**
 * Counts the occurrences of each flavor in an array
 * @param {string[]} flavors - Array of flavor strings
 * @returns {Object} An object with flavors as keys and counts as values
 */
function countFlavors(flavors) {
    const flavorCounts = {};

    for (const flavor of flavors) {
        if (flavorCounts[flavor]) {
            flavorCounts[flavor]++;
        } else {
            flavorCounts[flavor] = 1;
        }
    }

    return flavorCounts;
}

/**
 * Displays the flavor counts in the browser console
 * @param {Object} flavorCounts - Object containing flavor counts
 */
function displayInConsole(flavorCounts) {
    console.log('🎯 Froyo Flavor Order Summary:');
    console.log('==============================');
    
    for (const [flavor, count] of Object.entries(flavorCounts)) {
        console.log(`🍦 ${flavor}: ${count} order${count > 1 ? 's' : ''}`);
    }
    
    console.log('==============================');
    console.log(`Total flavors: ${Object.values(flavorCounts).reduce((sum, count) => sum + count, 0)}`);
}

/**
 * Updates the results display with flavor counts
 * @param {Object} flavorCounts - Object containing flavor counts
 */
function updateResultsDisplay(flavorCounts) {
    const resultsDiv = document.getElementById('results');
    const flavorCountsDiv = document.getElementById('flavor-counts');
    
    // Clear previous results
    flavorCountsDiv.innerHTML = '';
    
    // Create elements for each flavor count
    for (const [flavor, count] of Object.entries(flavorCounts)) {
        const flavorElement = document.createElement('div');
        flavorElement.className = 'flavor-count';
        
        flavorElement.innerHTML = `
            <span class="flavor-name">${flavor.charAt(0).toUpperCase() + flavor.slice(1)}</span>
            <span class="flavor-quantity">${count}</span>
        `;
        
        flavorCountsDiv.appendChild(flavorElement);
    }
    
    // Show results section
    resultsDiv.style.display = 'block';
}

/**
 * Shows an error message to the user
 * @param {string} message - The error message to display
 */
function showError(message) {
    const errorDiv = document.getElementById('error-message');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    
    // Hide results if they were showing
    document.getElementById('results').style.display = 'none';
}

/**
 * Hides the error message
 */
function hideError() {
    document.getElementById('error-message').style.display = 'none';
}

/**
 * Main function that handles the flavor counting process
 */
function processFlavors() {
    try {
        hideError();
        
        // Get and validate user input
        const userInput = getUserInput();
        const flavors = parseFlavors(userInput);
        
        // Count flavors
        const flavorCounts = countFlavors(flavors);
        
        // Display results
        displayInConsole(flavorCounts);
        updateResultsDisplay(flavorCounts);
        
    } catch (error) {
        showError(error.message);
        console.error('Error processing flavors:', error.message);
    }
}

/**
 * Initializes event listeners when the page loads
 */
function initializeApp() {
    const submitBtn = document.getElementById('submit-btn');
    const flavorsInput = document.getElementById('flavors');
    
    // Add click event to submit button
    submitBtn.addEventListener('click', processFlavors);
    
    // Add Enter key support
    flavorsInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            processFlavors();
        }
    });
    
    // Add input event to clear error when user starts typing
    flavorsInput.addEventListener('input', hideError);
    
    // Pre-fill with example data for testing
    flavorsInput.value = 'vanilla,vanilla,vanilla,strawberry,coffee,coffee';
    
    console.log('🍦 Froyo Flavors App Loaded!');
    console.log('Ready to process your flavor orders...');
}

// Initialize the app when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeApp);