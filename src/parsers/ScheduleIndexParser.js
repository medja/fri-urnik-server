import { Parser } from '../base';
import { ScheduleIndexBuilder as Builder } from '../builders';

class ScheduleIndexParser extends Parser {
    
    constructor(type) {
        super();
        
        this.builder = new Builder(type);
    }
    
    get result() {
        return this.builder.result;
    }
    
    isSection(tag) {
        return tag === 'div';
    }
    
    onOpenTag(tag, attrs) {
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