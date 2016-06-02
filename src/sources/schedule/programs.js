import { capitalize } from 'lodash';

import { Group } from './patterns';
import { Parser } from '../../core';

function parseProgram(value) {
    const [, year, name] = value.match(Group);
    const parts = name.replace(/\.$/, '').split(', ');
    
    const program = do {
        if (parts.length == 1) {
            parts[0];
        } else {
            capitalize(parts[0]);
        }
    };
    
    return {
        program,
        year: parseInt(year, 10)
    };
}

class Programs extends Parser {
    
    get result() {
        return this.programs;
    }
    
    parse(url) {
        this.name = null;
        this.group = null;
        this.programs = {};
        
        return super.parse(url);
    }
    
    onOpenTag(name, attributes) {
        if (name !== 'a') {
            return;
        }
        
        const match = attributes['href'].match(/group=(\d+)$/);
        
        if (match) {
            this.name = [];
            this.group = match[1];
        }
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
        
        const { year, program } = parseProgram(this.name.join(''));
        
        if (!this.programs[year]) {
            this.programs[year] = {};
        }
        
        this.programs[year][this.group] = program;
        
        this.group = null;
    }
    
}

export default Programs;