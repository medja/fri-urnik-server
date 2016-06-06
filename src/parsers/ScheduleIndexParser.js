import { Parser } from '../base';
import { ScheduleIndexBuilder as Builder } from '../builders';

class ScheduleIndexParser extends Parser {
    
    constructor(type, initial = null) {
        super();
        
        this.inital = initial;
        this.builder = new Builder(type, initial);
    }
    
    get result() {
        return this.builder.result;
    }
    
    itTitle(tag) {
        // When parsing using an initial id process titles as
        // they may contain the parent's information
        return this.inital != null && tag == 'h2';
    }
    
    isSection(tag) {
        if (this.inital) {
            return tag === 'p';
        } else {
            return tag === 'div';
        }
    }
    
    onOpenTag(tag, attrs) {
        if (this.itTitle(tag)) {
            this.builder.startTitle();
            return;
        }
        
        // Only index a predefined section of the site
        if (this.isSection(tag)) {
            this.builder.startSection();
            return;
        }
        
        if (tag !== 'a') {
            return;
        }
            
        const query = attrs['href'].split('?')[1];
        
        if (query == null) {
            return;
        }
        
        const [ type, id ] = query.split('=');
        
        this.builder.startAttribute(id, type);
    }
    
    onText(text) {
        this.builder.setValue(text);
    }
    
    onCloseTag(tag) {
        this.builder.endAttribute();
        
        if (this.isSection(tag)) {
            this.builder.endSection();
        }
    }
    
}

export default ScheduleIndexParser;