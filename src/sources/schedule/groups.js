import { escapeRegExp } from 'lodash';

import { Parser } from '../../core';

class Groups extends Parser {
    
    get result() {
        return this.groups;
    }
    
    parse(url, program) {
        this.groups = {};
        
        // Group name buffer and active group id
        this.name = null;
        this.group = null;
        
        // Active specifies if the parser is inside the group list
        this.active = false;
        // Program group name regex
        this.pattern = null;
        
        // First group's id can be calculated from the program id
        this.initial = parseInt(program, 10) + 1;
        
        return super.parse(url);
    }
    
    onOpenTag(name, attributes) {
        // The group list is inside the only paragraph
        if (name === 'p') {
            this.active = true;
            return;
        }
        
        // Skip elements that are not group links
        if (!this.active || name !== 'a') {
            return;
        }
        
        const match = attributes['href'].match(/group=(\d+)$/);
        
        if (!match) {
            return;
        }
        
        this.name = [];
        this.group = match[1];
    }
    
    // Handles partial text nodes
    onText(value) {
        if (this.group != null) {
            this.name.push(value);
        }
    }
    
    // Handles closing tags
    onCloseTag(name) {
        if (this.group == null) {
            return;
        }
        
        const value = this.name.join('');
        
        // Extract the group name pattern from the the first group
        if (this.pattern == null && this.group == this.initial) {
            const prefix = escapeRegExp(value.match(/^(.*_)\d+$/)[1]);
            this.pattern = new RegExp(`^${prefix}(\\d+)$`);
        }
        
        const match = value.match(this.pattern);
        
        if (!match) {
            return;
        }
        
        this.groups[this.group] = parseInt(match[1], 10);
        
        this.group = null;
    }
    
}

export default Groups;