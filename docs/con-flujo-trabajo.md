
Este documento explica el flujo de trabajo recomendado para todos los colaboradores del proyecto Calendar.

El objetivo es que cada persona trabaje en su propia rama, manteniendo main siempre estable, y que las integraciones se hagan a través de Pull Requests (PRs) en GitHub.







🔹 1. Clonar el repositorio

Cada colaborador debe clonar el proyecto desde GitHub (¡no usar git init!):

git clone https://github.com/Franco-I/Calendar.git
cd Calendar


⚠️ Importante: nunca usar git init ni git remote add origin, eso ya está configurado.






🔹 2. Configurar tu identidad (una sola vez)

Para que los commits queden asociados a ti:

git config --global user.name "Tu Nombre"
git config --global user.email "tu-email@ejemplo.com"







🔹 3. Revisar ramas existentes

Antes de trabajar, trae todas las ramas desde el remoto:

git fetch --all
git branch -a


Esto mostrará algo como:

* main
  remotes/origin/main
  remotes/origin/DragonWar
  remotes/origin/feature-login





🔹 4. Crear o usar una rama de trabajo
✅ Si la rama ya existe en GitHub:

Por ejemplo, si quieres trabajar en DragonWar:

git checkout DragonWar

✅ Si necesitas crear una nueva rama desde main:
git checkout main
git pull origin main   # asegura que tienes lo último de main
git checkout -b nombre-rama
git push -u origin nombre-rama


El parámetro -u enlaza tu rama local con la remota, así luego basta con git push.





🔹 5. Flujo de trabajo normal en tu rama

Cuando trabajes en tus cambios:

Ver el estado:

git status


Añadir los cambios:

git add .


Crear un commit:

git commit -m "Descripción clara de los cambios"


Subir tu rama a GitHub:

git push


A partir del primer push -u, solo necesitarás git push.








🔹 6. Mantener tu rama actualizada con main

Es muy común que main tenga cambios mientras tú trabajas en tu rama.
Para mantenerte actualizado:

git checkout main
git pull origin main       # baja lo último de main
git checkout tu-rama
git merge main             # o git rebase main

¿Merge o Rebase?

git merge main → más sencillo, mantiene la historia original.

git rebase main → más ordenado, pero puede requerir resolver conflictos.

En ambos casos, si hay conflictos debes resolverlos en los archivos afectados, luego:

git add archivo-conflictivo
git commit        # si usaste merge
git rebase --continue  # si usaste rebase


Finalmente, sube los cambios:

git push






🔹 7. Subir tus cambios a main (Pull Request)

👉 Nunca hagas push directamente a main.

Cuando termines tu trabajo en tu rama:

Sube todos tus cambios (git push).

Ve a GitHub → selecciona tu rama (DragonWar, feature-login, etc.).

Haz clic en New Pull Request.

Elige main como destino.

Crea el PR para que el administrador revise y haga merge.




