const planBasicoEng = document.getElementById('planBasicoEng');
const planProEng = document.getElementById('planProEng');
const cantColaboradores = document.getElementById('cantColaboradores');
const btnContacto = document.getElementById('contactar');
const shoppingCart = document.getElementById('shoppingCart');
const totalPrice = document.getElementById('totalPrice');
const totalPriceBasicEng = document.getElementById('totalPriceBasicEng');
const totalPriceProEng = document.getElementById('totalPriceProEng');
const formContact = document.getElementById('formContact');

/*
// shoppingCart elements
// ----------------------------------
const ContainerPlanEngSelected = document.getElementById('ContainerPlanEngSelected');
const planEngSelected = document.getElementById('planEngSelected');
const planCounterUsers = document.getElementById('planCounterUsers');
const priceEngSelected = document.getElementById('priceEngSelected');
*/

const DESCUENTOS = {
    'Engagement': {
        'PlanBasico': 0.15
    },
    'Formacion': {
        'PlanBasico': 0.15
    }
};

const BASE = {
    'Engagement': [{
        '300': { 'Base': 86, 'Unidad': 0.07 },
        '500': { 'Base': 89, 'Unidad': 0.09 },
        '1000': { 'Base': 99, 'Unidad': 0.08 },
        '4000': { 'Base': 109, 'Unidad': 0.07 },
        '10000': { 'Base': 119, 'Unidad': 0.05 },
    }],
    'Formacion': 1,
};

class Costo {
    constructor(planes) {
        this.planes = planes;
    }

    showPlan(plan) {
        if (plan === 'Engagement') {
            
            // ContainerPlanEngSelected.classList.remove('d-none');
            // planEngSelected.innerHTML = this.planes['Engagement'].plan;
            // planCounterUsers.innerHTML = this.planes['Engagement'].cantidadColaboradores;
            // priceEngSelected.innerHTML = this.planes['Engagement'].total;
            console.log(document.querySelector("#V2ViRm9ybUNhcHR1cmVCbG9jazozNGJmNDM5MC0wNTcwLTExZWUtYWIwYS04NTdmODYzZDZjZDI"));
            // debugger;

            // document.getElementById('V2ViRm9ybUNhcHR1cmVCbG9jazozNGJmNDM5MS0wNTcwLTExZWUtYWIwYS04NTdmODYzZDZjZDI').value = this.planes['Engagement'].cantidadColaboradores;
            // document.getElementById('V2ViRm9ybUNhcHR1cmVCbG9jazozNGJmNDM5MC0wNTcwLTExZWUtYWIwYS04NTdmODYzZDZjZDI').value = this.planes['Engagement'].plan;
            // document.getElementById('V2ViRm9ybUNhcHR1cmVCbG9jazozNGJmNDM5Mi0wNTcwLTExZWUtYWIwYS04NTdmODYzZDZjZDI').value = this.planes['Engagement'].total;

        } else if (plan === 'Formacion') {

        }
    }

    // funcion para ponerse en contacto
    planContactar() {
        console.log(this.plan, this.cantidadColaboradores);
    }
}

class CostoEng {
    constructor(plan, cantidadColaboradores, total) {
        this.plan = plan;
        this.cantidadColaboradores = cantidadColaboradores;
        this.total = total;
    }

    costoPlanBasico() {
        let total = this.calcularCosto();
        if (this.plan === 'basic') {
            total = total - (total * DESCUENTOS['Engagement']['PlanBasico']);
            total = parseFloat(total.toFixed(2));
        }

        totalPriceBasicEng.innerHTML = total;
        this.total = total;
    }

    costoPlanPro() {
        const total = this.calcularCosto();
        totalPriceProEng.innerHTML = total;
        this.total = total;
    }

    addPlan() {
        const planEng = {
            total: this.total,
            plan: this.plan,
            cantidadColaboradores: this.cantidadColaboradores
        }
        cotizador.planes['Engagement'] = planEng;
        cotizador.showPlan('Engagement');
    }

    calcularCosto() {
        let total = 0;
        let base = 0;
        let valorUsuario = 0;

        if (this.cantidadColaboradores <= 100) {
            total = BASE['Engagement'][0]['300']['Base'];
            return total;
        }else if (this.cantidadColaboradores > 100 && this.cantidadColaboradores <= 300) {
            base = BASE['Engagement'][0]['300']['Base'];
            valorUsuario = BASE['Engagement'][0]['300']['Unidad'];
            total = base + (valorUsuario * (this.cantidadColaboradores-100));
            return total;
        }else if (this.cantidadColaboradores > 300 && this.cantidadColaboradores <= 500) {
            base = BASE['Engagement'][0]['500']['Base'];
            valorUsuario = BASE['Engagement'][0]['500']['Unidad'];
        }else if (this.cantidadColaboradores > 500 && this.cantidadColaboradores <= 1000) {
            base = BASE['Engagement'][0]['1000']['Base'];
            valorUsuario = BASE['Engagement'][0]['1000']['Unidad'];
        }else if (this.cantidadColaboradores > 1000 && this.cantidadColaboradores <= 4000) {
            base = BASE['Engagement'][0]['4000']['Base'];
            valorUsuario = BASE['Engagement'][0]['4000']['Unidad'];
        }else if (this.cantidadColaboradores > 4000 && this.cantidadColaboradores <= 10000) {
            base = BASE['Engagement'][0]['10000']['Base'];
            valorUsuario = BASE['Engagement'][0]['10000']['Unidad'];
        }

        total = base + (valorUsuario * this.cantidadColaboradores);
        total = parseFloat(total.toFixed(2));
        return total;
    }
}

class costoAcre { }

//inicializando clases
const cotizadorEng = new CostoEng('basic', cantColaboradores.value, 0);
const cotizador = new Costo({ 'Engagement': [], 'Formacion': [] });

cotizadorEng.costoPlanBasico();
cotizadorEng.costoPlanPro();

planBasicoEng.addEventListener('click', (event) => {
    // shoppingCart.classList.remove("d-none");
    let plan = event.target.dataset.value;
    cotizadorEng.plan = plan;
    cotizadorEng.costoPlanBasico();
    cotizadorEng.addPlan();
    totalPrice.innerHTML = cotizadorEng.total;
});

planProEng.addEventListener('click', (event) => {
    // shoppingCart.classList.remove("d-none");
    let plan = event.target.dataset.value;
    cotizadorEng.plan = plan;
    cotizadorEng.costoPlanPro();
    cotizadorEng.addPlan();
    totalPrice.innerHTML = cotizadorEng.total;
});

cantColaboradores.addEventListener('keyup', (event) => {
    let cantColaboradores = parseInt(event.target.value);
    cantColaboradores = isNaN(cantColaboradores) ? 0 : cantColaboradores;

    cotizadorEng.cantidadColaboradores = cantColaboradores;
    cotizadorEng.costoPlanBasico();
    cotizadorEng.costoPlanPro();
});

// btnContacto.addEventListener('click', event => {
//     cotizadorEng.planContactar();
// });