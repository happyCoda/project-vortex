import * as Vue from 'vue';
import * as vts from 'vue-typescript-component';

interface IApp {
}

@vts.component()
class App extends Vue implements IApp {
}

export default App;
