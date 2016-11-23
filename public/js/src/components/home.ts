import * as Vue from 'vue';
import * as vts from 'vue-typescript-component';

interface IHome {
    greet: string;
}

@vts.component()
class Home extends Vue implements IHome {
    greet = 'Vortex Project';
}

export default Home;
