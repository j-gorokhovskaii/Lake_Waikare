// Māori language handling
class MaoriLanguageHandler {
    constructor() {
        this.translations = {};
        this.currentLanguage = 'en';
        this.loadTranslations();
    }

    async loadTranslations() {
        try {
            const response = await fetch('/translations/maori.json');
            this.translations = await response.json();
        } catch (error) {
            console.error('Error loading Māori translations:', error);
        }
    }

    setLanguage(lang) {
        this.currentLanguage = lang;
        this.updatePageContent();
    }

    getTranslation(key) {
        const keys = key.split('.');
        let value = this.translations;
        
        for (const k of keys) {
            if (value[k] === undefined) {
                console.warn(`Translation missing for key: ${key}`);
                return key;
            }
            value = value[k];
        }
        
        return value;
    }

    updatePageContent() {
        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            element.textContent = this.getTranslation(key);
        });

        // Update all elements with data-i18n-placeholder attribute
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            element.placeholder = this.getTranslation(key);
        });

        // Update page title
        const titleKey = document.body.getAttribute('data-i18n-title');
        if (titleKey) {
            document.title = this.getTranslation(titleKey);
        }

        // Update meta description if exists
        const descriptionKey = document.body.getAttribute('data-i18n-description');
        if (descriptionKey) {
            const metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
                metaDescription.content = this.getTranslation(descriptionKey);
            }
        }
    }
}

// Initialize language handler
const languageHandler = new MaoriLanguageHandler();

// Add language switcher to the page
function addLanguageSwitcher() {
    const switcher = document.createElement('div');
    switcher.className = 'language-switcher maori-button';
    switcher.innerHTML = `
        <button onclick="languageHandler.setLanguage('mi')">Māori</button>
        <button onclick="languageHandler.setLanguage('en')">English</button>
    `;
    document.body.appendChild(switcher);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    addLanguageSwitcher();
    languageHandler.updatePageContent();
}); 