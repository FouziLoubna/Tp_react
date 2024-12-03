import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';

function CompteForm() {
    // Initialisation de l'état pour stocker les données du formulaire
    const [compte, setCompte] = useState({ solde: 0, dateCreation: '', type: 'COURANT' });
    const [error, setError] = useState(''); // Pour stocker les messages d'erreur

    // Gestion des changements dans les champs du formulaire
    const handleChange = (e) => {
        setCompte({ ...compte, [e.target.name]: e.target.value });
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault(); // Empêche le rechargement de la page
        setError(''); // Réinitialisation de l'erreur

        // Validation basique des données
        if (compte.solde < 0) {
            setError('Le solde ne peut pas être négatif.');
            return;
        }
        if (!compte.dateCreation) {
            setError('La date de création est obligatoire.');
            return;
        }

        axios.post(`${API_BASE_URL}/comptes`, compte) // Envoie une requête POST
            .then((response) => {
                alert('Compte ajouté avec succès.');
                setCompte({ solde: 0, dateCreation: '', type: 'COURANT' }); // Réinitialisation des champs
            })
            .catch((error) => {
                setError('Erreur lors de l’ajout du compte. Veuillez réessayer.');
                console.error(error);
            });
    };

    return (
        <div className="container mt-4">
            <h2>Ajouter un Compte</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="solde">Solde</label>
                    <input
                        type="number"
                        name="solde"
                        className="form-control"
                        value={compte.solde}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="dateCreation">Date de Création</label>
                    <input
                        type="date"
                        name="dateCreation"
                        className="form-control"
                        value={compte.dateCreation}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="type">Type</label>
                    <select
                        name="type"
                        className="form-select"
                        value={compte.type}
                        onChange={handleChange}
                        required
                    >
                        <option value="COURANT">Courant</option>
                        <option value="EPARGNE">Épargne</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Ajouter</button>
            </form>
        </div>
    );
}

export default CompteForm;
