// Dark mode functionality
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        // Apply saved theme on load
        this.applyTheme();
        
        // Add theme toggle button to all pages
        this.addThemeToggle();
        
        // Listen for system theme changes
        this.listenToSystemTheme();
    }

    addThemeToggle() {
        const button = document.createElement('button');
        button.className = 'theme-toggle';
        button.innerHTML = `<i class="fas fa-${this.theme === 'dark' ? 'sun' : 'moon'}"></i>`;
        button.setAttribute('aria-label', 'Toggle dark mode');
        
        button.addEventListener('click', () => this.toggleTheme());
        
        // Find the user functions container or create one
        let userFunctionsContainer = document.querySelector('.user-functions-container');
        if (!userFunctionsContainer) {
            userFunctionsContainer = document.createElement('div');
            userFunctionsContainer.className = 'user-functions-container';
            
            // Find the user functions element
            const userFunctions = document.querySelector('.userFunctions');
            if (userFunctions) {
                userFunctions.parentNode.insertBefore(userFunctionsContainer, userFunctions);
                userFunctionsContainer.appendChild(userFunctions);
            } else {
                // If no user functions found, add to header
                const header = document.querySelector('.SiteHeader');
                if (header) {
                    header.appendChild(userFunctionsContainer);
                }
            }
        }
        
        userFunctionsContainer.appendChild(button);
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        // Update toggle button icon if it exists
        const toggleButton = document.querySelector('.theme-toggle i');
        if (toggleButton) {
            toggleButton.className = `fas fa-${this.theme === 'dark' ? 'sun' : 'moon'}`;
        }
    }

    toggleTheme() {
        this.theme = this.theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', this.theme);
        this.applyTheme();
    }

    listenToSystemTheme() {
        // Check if user hasn't set a preference
        if (!localStorage.getItem('theme')) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            
            // Set initial theme based on system preference
            if (mediaQuery.matches) {
                this.theme = 'dark';
                this.applyTheme();
            }
            
            // Listen for system theme changes
            mediaQuery.addEventListener('change', (e) => {
                if (!localStorage.getItem('theme')) {
                    this.theme = e.matches ? 'dark' : 'light';
                    this.applyTheme();
                }
            });
        }
    }
}

// Initialize theme manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.themeManager = new ThemeManager();
}); 