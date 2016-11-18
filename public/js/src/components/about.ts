import * as Vue from 'vue';
import * as vts from 'vue-typescript-component';

interface IAbout {
    greet: string;
}

@vts.component()
class About extends Vue implements IAbout {
    greet = 'about';
}

export default About;
