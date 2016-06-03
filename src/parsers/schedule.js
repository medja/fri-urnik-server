import { Parser } from '../base';
import { ScheduleBuilder as Builder } from '../builders';

class ScheduleParser extends Parser {
    
    constructor() {
        super();
        
        this.builder = new Builder();
    }
    
    get result() {
        return this.builder.result;
    }
    
    onOpenTag(tag, attrs) {
        if (tag === 'h2') {
            // A title is a special kind of attribute
            this.builder.startTitle();
        }
        
        if (tag === 'td') {
            // Starts an allocation or an hour
            const classNames = attrs['class'].split(' ');
            const rowSpan = attrs['rowspan'];
            
            this.builder.startAllocation(classNames, rowSpan);
            return;
        }
        
        if (!this.builder.hasAllocation()) {
            return;
        }
        
        if (tag === 'span') {
            // A description is a special kind of attribute
            this.builder.startDescription();
            return;
        }
        
        if (tag === 'a') {
            const type = attrs['class'];
            const id = attrs['href'].split('=')[1];
            
            this.builder.startAttribute(id, type);
            return;
        }
    }
    
    onText(text) {
        this.builder.setValue(text);
    }
    
    onCloseTag(tag) {
        if (tag === 'tr') {
            this.builder.endHour();
        } else if (tag === 'td') {
            this.builder.endAllocation();
        } else if (tag !== 'br') {
            this.builder.endAttribute();
        }
    }
    
}

export default ScheduleParser;