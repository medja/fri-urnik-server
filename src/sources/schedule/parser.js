import Builder from './builder';
import { Parser as Base } from '../../core';

class Parser extends Base {
    
    get result() {
        return this.builder.result();
    }
    
    // Creates a new schedule builder
    parse(url) {
        this.builder = new Builder();
        
        return super.parse(url);
    }
    
    // Handles opening tags
    onOpenTag(name, attributes) {
        if (name === 'h2') {
            this.builder.startTitle();
        }
        
        if (name === 'td') {
            this.builder.startAllocation(attributes);
            return;
        }
        
        if (!this.builder.hasAllocation()) {
            return;
        }
        
        if (name === 'span') {
            this.builder.startDescription();
            return;
        }
        
        if (attributes['class'] === 'group') {
            this.builder.addGroup(attributes);
            return;
        }
        
        if (name === 'a') {
            this.builder.startMeta(attributes);
            return;
        }
    }
    
    // Handles partial text nodes
    onText(text) {
        this.builder.setValue(text);
    }
    
    // Handles closing tags
    onCloseTag(name) {
        if (name === 'tr') {
            this.builder.endHour();
        } else if (name === 'td') {
            this.builder.endAllocation();
        }
        
        if (name !== 'br') {
            this.builder.endMeta();
        }
    }
    
}

export default Parser;