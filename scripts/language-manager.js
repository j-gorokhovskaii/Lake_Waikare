class LanguageManager {
    constructor() {
        this.currentLanguage = 'mi'; // Default to Te Reo
        this.translations = {
            'en': {},
            'mi': {}
        };
        this.loadTranslations();
        this.updatePageContent();
    }

    async loadTranslations() {
        try {
            const [enResponse, miResponse] = await Promise.all([
                fetch('locales/en/translation.json'),
                fetch('locales/mi/translation.json')
            ]);
            
            this.translations['en'] = await enResponse.json();
            this.translations['mi'] = await miResponse.json();
        } catch (error) {
            console.error('Error loading translations:', error);
        }
    }

    toggleLanguage() {
        this.currentLanguage = this.currentLanguage === 'en' ? 'mi' : 'en';
        this.updatePageContent();
        this.updateFlag();
    }

    updatePageContent() {
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (this.translations[this.currentLanguage][key]) {
                element.textContent = this.translations[this.currentLanguage][key];
            }
        });
    }

    updateFlag() {
        const flagElement = document.querySelector('.language-flag');
        if (flagElement) {
            flagElement.src = this.currentLanguage === 'en' 
                ? 'images/Flag_of_New_Zealand.svg' 
                : 'images/Tino_Rangatiratanga_Maori_sovereignty_movement_flag.svg';
        }
    }

    getCurrentLanguage() {
        return this.currentLanguage;
    }
}

// Initialize the language manager
const languageManager = new LanguageManager(); 