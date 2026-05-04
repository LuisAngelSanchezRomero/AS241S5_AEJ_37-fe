# VisionAI Frontend

Proyecto realizado en Angular 18 haciendo uso de APIs de GLM y Imagga para análisis de texto e imágenes.

---

## Descripción

Aplicación web que permite realizar consultas a dos APIs diferentes:
- **GLM 4.5 Air**: Para conversaciones de texto
- **Imagga**: Para análisis de imágenes por URL

Incluye funcionalidad CRUD completa para ambas APIs.

---

## APIs Integradas

<img src="https://openrouter.ai/favicon.ico" align="right" style="width: 60px"/>

### GLM 4.5 Air - Chat de Texto
- **Ruta**: `/glm`
- **Funcionalidad**: Conversaciones con modelo de lenguaje
- **Endpoint**: Chat y actualización de consultas

<img src="https://imagga.com/static/images/imagga_logo.png" align="right" style="width: 140px"/>

### Imagga - Análisis de Imágenes  
- **Ruta**: `/images`
- **Funcionalidad**: Detección de objetos en imágenes por URL
- **Endpoint**: Análisis y re-análisis de imágenes

---

## Estructura del Proyecto

```
visionai/src/app/
├── core/
│   ├── interfaces/
│   │   └── ai-result.ts           
│   └── services/
│       ├── glm.service.ts         
│       ├── pictocaption.service.ts 
│       └── theme.service.ts       
├── feature/
│   ├── glm/
│   │   ├── glm-form/             
│   │   └── glm-list/             
│   └── pictocaption/
│       ├── image-form/           
│       └── image-list/           
└── shared/
    └── components/
        ├── header/               
        └── theme-toggle/         
```

---

## Tecnologías y Dependencias

### Framework Principal
- Angular: 18.x
- TypeScript: 5.x
- RxJS: Programación reactiva
- Angular Router: Navegación SPA

### Dependencias Clave
```json
{
  "@angular/common": "^18.0.0",
  "@angular/core": "^18.0.0", 
  "@angular/forms": "^18.0.0",
  "@angular/router": "^18.0.0",
  "rxjs": "~7.8.0"
}
```

---

## Instalación

```bash
# Clonar repositorio
git clone <repository-url>
cd visionai

# Instalar dependencias
npm install

# Ejecutar aplicación
ng serve
```

### URLs de Acceso
- **Aplicación**: `http://localhost:4200`
- **GLM Chat**: `http://localhost:4200/chat`  
- **Imagga Analysis**: `http://localhost:4200/images`

---

## Arquitectura de Componentes

### Patrón de Diseño
- **Smart Components**: Gestión de estado y lógica de negocio
- **Dumb Components**: Presentación y eventos
- **Services**: Comunicación con APIs y estado compartido
- **Interfaces**: Tipado fuerte con TypeScript

### Flujo de Datos
```
User Input → Component → Service → HTTP Client → Backend API
Backend Response → Service → Component → UI Update
```